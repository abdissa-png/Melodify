import { all,call,put,takeLatest } from 'redux-saga/effects';
import { 
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut } from '@firebase/auth'; 
import { logoutSuccess,logoutFailure,loginSuccess, loginFailure,registerSuccess,registerFailure } from '@/lib/store/slices'; 
import { fbSetDoc } from '@/lib/helpers'; 
import { auth } from "@/configs";
import { useNotification } from "@/hooks";
// login Saga
function* loginUserSaga(action) { 
	const { email, password } = action.payload;
	const [notify] = useNotification();
	try { 
	const userCredential = yield call( signInWithEmailAndPassword, auth, email, password ); 
	// If successful, dispatch loginSuccess with user information 
	yield put(loginSuccess({ currentUser: JSON.parse(JSON.stringify(userCredential.user)) }));
	} catch (error) { 
	// If login fails, dispatch loginFailure with error message  
	notify({
		title: "Error",
		variant: "error",
		description: error?.code,
	  });
	yield put(loginFailure({ error: error?.code }));

 } }
export function* watchLogin() {
	yield takeLatest('currentUser/loginRequest', loginUserSaga);
}

//Register Saga
function* registerUserSaga(action) {
	const { email, password, username } = action.payload;
	try { 
		const authResp = yield call(createUserWithEmailAndPassword, auth, email, password);
		yield call(updateProfile, auth.currentUser, { displayName: username, }); 
		yield call(fbSetDoc, { collection: 'users', id: authResp.user?.uid, data: { email: authResp.user.email, username: username, prefs: {}, }, });
		yield put(registerSuccess({currentUser:JSON.parse(JSON.stringify(authResp.user))})); 
	} catch (error) {
		console.error('Registration error:', error?.code);
		notify({
			title: "Error",
			variant: "error",
			description: error?.code || JSON.stringify(error),
		  });
		yield put(registerFailure({error:error?.code}));
	} 
} 
export function* watchRegister() {
	yield takeLatest('currentUser/registerRequest', registerUserSaga);
}

//logout saga

function* logoutSaga(action) { 
	const [notify] = useNotification();
	try { 
	// Perform logout logic here, for example, using Firebase // await auth.signOut(auth); // Replace the above line with your actual logout logic // Dispatch logout success action 
	   yield call(signOut,auth)
	   yield put(logoutSuccess()); 
	} catch (error) { 
	   // Dispatch logout failure action 
	   notify({
		title: "Error",
		variant: "error",
		description: error?.code || JSON.stringify(error),
	  });
	   yield put(logoutFailure({error:error?.code})); }
 } 
export function* watchLogout() { 
	yield takeLatest('currentUser/logoutRequest', logoutSaga);
}
