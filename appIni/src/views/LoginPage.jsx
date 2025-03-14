import {auth} from '../firebase/config.js'
import {useState} from 'react';
import {  
         createUserWithEmailAndPassword         ,
         sendPasswordResetEmail,
         signInWithEmailAndPassword,
         signInWithPopup,
         GoogleAuthProvider

 } from "firebase/auth";


function LoginPage() {

    const [loginType, setLoginType] = useState('login');
    const [userCredenciais, setUserCredenciais] = useState({})
    const [error , setError] = useState('')

    const dic_erros = {
        'auth/email-already-in-use': "O email fornecido já está em uso.",
        'auth/invalid-email': "Informe um email válido.",
        'auth/operation-not-allowed': "Esta operação não é permitida, verifique as configurações.",
        'auth/weak-password': "A senha fornecida é muito fraca.",
        'auth/user-disabled': "A conta foi desativada.",
        'auth/user-not-found': "Nenhum usuário encontrado com esse email.",
        'auth/wrong-password': "A senha fornecida está incorreta.",
        'auth/missing-email': "Informe um email válido.",
        'auth/account-exists-with-different-credential': "A conta já existe com credenciais diferentes.",
        'auth/credential-already-in-use': "As credenciais fornecidas já estão em uso.",
        'auth/invalid-credential': "Credenciais inválidas fornecidas.",
        'auth/requires-recent-login': "É necessário fazer login recentemente para realizar essa operação.",
        'auth/too-many-requests': "Muitas tentativas de login. Tente novamente mais tarde.",
        'auth/network-request-failed': "Falha na requisição de rede. Verifique sua conexão.",
        'auth/timeout': "A solicitação excedeu o tempo limite. Tente novamente.",
        'auth/configuration-not-found': "A configuração do provedor de autenticação não foi encontrada.",
        'auth/missing-password': "Informe sua senha."
    };
    

    function handleCred(e){
        setUserCredenciais({...userCredenciais, [e.target.name]: e.target.value})
        //console.log(userCredenciais.email)
    }

    function handleSignUp(e){
        e.preventDefault();
        setError('')

        createUserWithEmailAndPassword(auth, userCredenciais.email, userCredenciais.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setError( dic_erros[errorCode]  || errorMessage)
            // ..
        }); 
    }

    function handleSignIn(e){
        e.preventDefault();
        setError('')

        signInWithEmailAndPassword(auth, userCredenciais.email, userCredenciais.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)

            setError( dic_erros[errorCode]  || errorMessage)

            // ..
        }); 
    }

    function handlePasswordReset(){
        const email = prompt('Informe seu e-mail:')
        sendPasswordResetEmail(auth, email)
    }

    const handleGoogleLogin = async(e) =>{
        e.preventDefault()

        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider) 

            const user = result.user
            console.log (' Google login ok', user)

        } catch(error){
            //const errorCode = error.code;
            console.error('Google login failed:', error);

            const errorMessage = error.message;
            setError( errorMessage)

        }

    }


    return (
        <>
        <div className="container login-page">
          <section>
            <h1>Etec Albert Einstein</h1>
            <p>Entre ou crie uma conta para continuar.</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Entrar
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Criar Conta
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>E-mail *</label>
                      <input onChange={(e)=>{handleCred(e)}}  type="text" name="email" placeholder="Informe seu email" />
                  </div>
                  <div className="form-control">
                      <label>Senha *</label>
                      <input onChange={(e)=>{handleCred(e)}}  type="password" name="password" placeholder="Informe a senha" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>handleSignIn(e)} className="active btn btn-block">Entrar</button>
                    : 
                    <button onClick={(e)=>handleSignUp(e)}  className="active btn btn-block">Criar Conta</button>


                  }

                  {
                    <button onClick={(e)=>handleGoogleLogin(e)}  className="active btn btn-block">Login com Google</button>
                  }

                  {
                    <div className='error'> {error} </div>
                  }
 
                  {

                  }
                  <p  onClick={handlePasswordReset} className="forgot-password">Esqueci minha senha.</p>
                  
              </form>
          </section>
        </div>


        </>
    )
}

export default LoginPage