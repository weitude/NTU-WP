import {useChat} from "./containers/hooks/useChat";
import SignIn from "./containers/SignIn";
import ChatRoom from "./containers/ChatRoom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

function App() {
    const {signedIn} = useChat()

    return (
        <Wrapper>
            {signedIn ? <ChatRoom/> : <SignIn/>}
        </Wrapper>
    )
}

export default App
