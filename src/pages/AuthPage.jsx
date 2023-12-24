import { useState } from "react";
import { auth, provider } from "./../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  //Kaydol modunda mıyız? state'i
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const navigate = useNavigate();

  //Hesaba giriş yap/ Hesap oluştur
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      //Yeni hesap oluştur
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesabınız oluşturuldu"), navigate("/feed");
        })
        .catch((err) => toast.error(`Üzgünüz hata oluştu: ${err.code}`));
    } else {
      //Varolan hesapta oturum aç
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Giriş Yapıldı"), navigate("/feed");
        })
        .catch((err) => {
          //Eğer ki hata kodu şifre yanlış yazılınca ortaya çıkan kod
          //ise o zaman şifremi unuttum yazısını göster
          if (err.code === "auth/invalid-credential") {
            setIsForgotPassword(true);
          }
          toast.error(`Üzgünüz hata oluştu: ${err.code}`);
        });
    }
  };

  //Şifre sıfırlama epostası gönder
  const sendMail = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      toast.info("Epostanıza sıfırlama bağlantısı gönderildi").catch(() => {
        toast.error("Mail Gönderilemedi");
      });
    });
  };

  //Google ile giriş yap
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => navigate("/feed"));
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        {/*Logo */}
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logo.webp" />
        </div>

        <h1 className="text-center font-bold text-xl">Twitter'a giriş yap</h1>
        {/* Google Button */}
        <button
          onClick={loginWithGoogle}
          className="flex items-center bg-white py-2 px-10 rounded-full text-black cursor-pointer gap-3 transition hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.svg" />
          <span className="whitespace-nowrap">Google ile giriş yap</span>
        </button>
        {/* Giriş Formu*/}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-5">Şifre</label>
          <input
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]"
            type="password"
            required
            onChange={(e) => setPass(e.target.value)}
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-500">
            {isSignUp ? "Kaydol" : "Giriş Yap"}
          </button>
          <p className="mt-5 flex gap-4">
            <span className="text-gray-500">Hesabınız Yoksa</span>
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 cursor-pointer select-none"
            >
              {isSignUp ? "Giriş Yapın" : "Kaydolun"}
            </span>
          </p>
        </form>
        {isForgotPassword && (
          <p onClick={sendMail} className="text-center text-red-500">
            Şifrenizi unuttunuz mu?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
