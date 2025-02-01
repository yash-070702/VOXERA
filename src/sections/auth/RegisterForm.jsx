import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import FormProvider from '../../components/hook-form/FormProvider'
import { setSignupData } from "../../Redux/slices/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Stack, Alert, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Eye, EyeSlash } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { RHFTextField } from "../../components/hook-form";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../services/operations/authAPI";
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch();
const navigate=useNavigate();
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
    try {
      if(data.password!=data.confirmPassword){
        toast.error("Password Do Not Match");
        return;
      }
      console.log(data);
      // submit data to backend
      dispatch(setSignupData(data));
      dispatch(sendOtp(data.email, navigate))
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={3} mb={4}>
      {!!errors.afterSubmit && (
        <Alert severity="error">{errors.afterSubmit.message}</Alert>
      )}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <RHFTextField name="firstName" label="First name" />
        <RHFTextField name="lastName" label="Last name" />
      </Stack>

      <RHFTextField name="email" label="Email address" />

      <RHFTextField
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Eye /> : <EyeSlash />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
           <RHFTextField
        name="confirmPassword"
        label="confirmPassword"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Eye /> : <EyeSlash />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>

    <LoadingButton
      fullWidth
      color="inherit"
      size="large"
      type="submit"
      variant="contained"
      // loading={isLoading}
      sx={{
        bgcolor: "text.primary",
        color: (theme) =>
          theme.palette.mode === "light" ? "common.white" : "grey.800",
        "&:hover": {
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
        },
      }}
    >
      Create Account
    </LoadingButton>
  </FormProvider>
);
};

export default RegisterForm;
