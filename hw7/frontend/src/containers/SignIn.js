import Title from "../components/Title";
import LogIn from "../components/LogIn";
import {useChat} from "./hooks/useChat";

const SignIn = () => {
    const {me, setMe, setSignedIn, displayStatus} = useChat();
    const handleLogin = (name) => {
        if (!name)
            displayStatus({
                type: "error",
                msg: "Missing user name",
            });
        else setSignedIn(true);
    }
    return (
        <>
            <Title />
            <LogIn me={me} setMe={setMe} onLogin={handleLogin}/>
        </>
    );
}

export default SignIn