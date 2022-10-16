import MovieIcon from "@mui/icons-material/Movie";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { fetchRequestToken, fetchSessionId } from "../api/movie";

const LoginContainer = styled(Container)`
  width: 100%;
  height: 100%;
  margin: 16% auto;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.color.error};
  margin-top: 10px;

  &:before {
    display: inline;
    content: "⚠ ";
  }
`;

const LogInButton = styled(Button)`
  background-color: ${props => props.theme.color.brown} !important;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 500;
  text-align: center;
`;

const Icon = styled(Avatar)`
  margin: 10px auto !important;
`;

const Login = () => {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    try {
      const reqToken = await fetchRequestToken().catch((err: Error) => {
        throw new Error(`fetchRequestToken call failed. error: ${err}`);
      });

      if (reqToken) {
        window.open(
          `https://www.themoviedb.org/authenticate/${reqToken}`,
          "_blank",
        );

        let sessionId;
        const interval = setInterval(async () => {
          sessionId = await fetchSessionId(reqToken);

          if (sessionId) {
            document.cookie = `session_id=${sessionId}`;
            navigation("/movie/list");

            clearInterval(interval);
          }
        }, 6000);
      }
    } catch (err: unknown) {
      console.error(err);
      alert("error 발생 :D");
    }
  };

  return (
    <LoginContainer maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CssBaseline />
        <Icon sx={{ m: 1 }}>
          <MovieIcon />
        </Icon>
        <Title>로그인</Title>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          autoComplete="email"
          {...register("email", {
            required: true,
            pattern: /\S+@\S+\.\S+/,
          })}
          autoFocus
        />
        {errors?.email?.type === "pattern" && (
          <ErrorMessage>이메일 형식이 잘못 입력 되었습니다</ErrorMessage>
        )}
        {errors?.email?.type === "required" && (
          <ErrorMessage>Email을 입력하세요</ErrorMessage>
        )}

        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            pattern:
              /^(?=.*[a-zA-Z])((?=.*d)|(?=.*W)).{10,}|(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
          })}
        />
        {errors?.password?.type === "pattern" && (
          <ErrorMessage>비밀번호 형식에 맞지 않게 입력 되었습니다</ErrorMessage>
        )}
        {errors?.password?.type === "required" && (
          <ErrorMessage>Password를 입력하세요</ErrorMessage>
        )}

        <LogInButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </LogInButton>
      </form>
    </LoginContainer>
  );
};

export default Login;
