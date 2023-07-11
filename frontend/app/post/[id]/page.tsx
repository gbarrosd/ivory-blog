"use client";
import { publicAPI } from "@/api";
import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  SpaceProps,
  Stack,
  Tag,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

interface Comment {
  id: number;
  author_name: string;
  content: string;
  publication_date: string;
  post: number;
}

interface CreateComment {
  author_name: string;
  content: string;
  post: number;
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date}</Text>
    </HStack>
  );
};

interface BlogAuthorProps {
  date: string;
  name: string;
}

interface BlogPost {
  id: number;
  title: string;
  publication_date: string;
  content: string;
  comments: Comment[];
  category: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    email: string;
    full_name: string;
  };
}

interface CreateComment {
  author_name: string;
  content: string;
  post: number;
}

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ date }: { date: string }) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Stack spacing={-1} align={"center"}>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {date}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function RetrievePost(params: any) {
  const [post, setPosts] = useState<BlogPost>();
  async function HandleFetchData() {
    const post = await publicAPI.get<BlogPost>(`/post/${params.params.id}/`);
    setPosts(post.data);
  }

  useEffect(() => {
    HandleFetchData();
  }, []);

  const [size, setSize] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (newSize: React.SetStateAction<string>) => {
    setSize(newSize);
    onOpen();
  };

  const sizes = ["md"];

  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const toast = useToast();

  async function addComment(post: any) {
    try {
      const addComment = await publicAPI.post<any, any, CreateComment>(
        "/comment/",
        { author_name: authorName, content, post }
      );
      window.location.reload();
      toast({
        title: "Comentario feito!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {}
  }

  return (
    <Container maxW={"7xl"} p="12">
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">{post?.title}</Heading>
        <BlogTags tags={[`${post?.category.name}`]} />
        <Text as="p" fontSize="lg">
          {post?.content}
        </Text>
        <BlogAuthor
          name={`${post?.user.full_name}`}
          date={`${post?.publication_date}`}
        />
      </VStack>
      <hr />

      {post?.comments.map((comment) => {
        return (
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 10, md: 4, lg: 10 }}
          >
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>{comment.author_name}</TestimonialHeading>
                <TestimonialText>{comment.content}</TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar date={comment.publication_date} />
            </Testimonial>
          </Stack>
        );
      })}
      <hr />
      <>
        {sizes.map((size) => (
          <Button onClick={() => handleClick(size)} key={size} m={4}>
            Comentar
          </Button>
        ))}
        <Button
          bg={"red.400"}
          color={"white"}
          _hover={{
            bg: "red.500",
          }}
          as={"a"}
          href="/"
        >
          Voltar
        </Button>

        <Drawer onClose={onClose} isOpen={isOpen} size={size}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Escreva seu comentario</DrawerHeader>
            <DrawerBody>
              <FormControl id="author_name" isRequired>
                <FormLabel>Nome:</FormLabel>
                <Input
                  placeholder="Escreva seu nome"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
                <Text mb="8px">Comentario:</Text>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escreva seu comentario"
                  size="md"
                />
              </FormControl>
              <Stack spacing={6}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => addComment(post?.id)}
                >
                  Comentar
                </Button>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </Container>
  );
}
