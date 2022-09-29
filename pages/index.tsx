import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

interface InputT {
  id: string;
  password: string;
  height: number;
}

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputT>();

  const getFruit = async () => {
    const { data } = await axios.get("/api");

    return data;
  };

  const { mutate } = useMutation<InputT, unknown, InputT>((data) =>
    axios.post("/setting", data)
  );

  // const { data } = useQuery(["dfa"], getFruit);
  console.log("data errors: ", errors);

  const onSubmit = (data: InputT) => {
    mutate(data);
    console.log("input data: ", data);
  };

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          spacing="20px"
          width={{ base: "300px", md: "500px" }}
          fontSize={{ base: "10px", md: "24px" }}
        >
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "14px", md: "24px" }}>ID</FormLabel>
            <Input
              type="text"
              {...register("id", { required: "Please enter your first name." })}
              defaultValue="aaa"
              focusBorderColor="none"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "14px", md: "24px" }}>
              Password
            </FormLabel>
            <Input
              type="password"
              {...register("password", { required: "Please enter password" })}
              focusBorderColor="none"
            />
          </FormControl>
          <FormControl
            isInvalid={!!errors.height?.type}
            height="80px"
            isRequired
          >
            <FormLabel fontSize={{ base: "14px", md: "24px" }}>
              Height
            </FormLabel>
            <Input
              type="number"
              {...register("height", {
                valueAsNumber: true,
                required: true,
                minLength: { value: 3, message: "5자리 이상 숫자만 넣으세요" },
                pattern: /^[0-9]+$/,
              })}
              defaultValue={200}
              focusBorderColor="none"
            />
            <FormErrorMessage>
              {errors.height && "3자리 이상 숫자만 넣으세요"}
            </FormErrorMessage>
          </FormControl>
          <Input type="submit" value="Apply" outline="none" />
        </VStack>
      </form>
    </Box>
  );
};

export default Home;
