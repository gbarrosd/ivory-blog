"use client";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { publicAPI } from "../../api";

interface Register {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export default function UserProfileEdit(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();
  const toast = useToast();

  async function register() {
    try {
      const registerUser = await publicAPI.post<any, any, Register>(
        "/register/",
        { first_name: firstName, last_name: lastName, email, password }
      );
      toast({
        title: "Conta criada!",
        description: "Pode fazer login agora.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/login");
    } catch (error) {}
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Registro de usuario
        </Heading>
        <FormControl id="firstName" isRequired>
          <FormLabel>Primeiro Nome</FormLabel>
          <Input
            placeholder="Primeiro nome"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl id="lastName" isRequired>
          <FormLabel>Segundo Nome</FormLabel>
          <Input
            placeholder="Segundo Nome"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="seu-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Senha</FormLabel>
          <Input
            placeholder="Senha"
            _placeholder={{ color: "gray.500" }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            as={"a"}
            href="/"
          >
            Cancelar
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={register}
          >
            Registrar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
