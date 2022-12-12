import { GATEWAY_URL, PAGE_UNAVAILABLE_MSG } from "./Constants";
import { GetUserContext } from "./UserContext";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Select,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { tryGetAmountBlockedUsers } from "./Backend";

export default function Metricas() {
  const [cantidadUsuariosBloqueados, setCantidadUsuariosBloqueados] =
    useState(null);
  const context = GetUserContext();

  useEffect(() => {
    const getUsuariosBloqueados = async () => {
      try {
        let response = await tryGetAmountBlockedUsers();
        setCantidadUsuariosBloqueados(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUsuariosBloqueados();
  }, []);
  if (!context.userStatus.isLoggedIn) {
    return <h2>{PAGE_UNAVAILABLE_MSG}</h2>;
  }

  return (
    <>
      <Box
        overflowY="auto"
        m="10"
        maxH="full"
        rounded="sm"
        bg="gray.300"
        py="10"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray",
            borderRadius: "24px",
          },
        }}
      >
        <Box className="arriba" display="flex">
          <Box margin={5} className="registrations">
            <FormLabel>Registros</FormLabel>
            <Select bg="white" width="60">
              <option value="MAIL">Por email</option>
              <option value="IDFED">Por identidad federada</option>
            </Select>
            <FormLabel marginTop={5}>Desde...</FormLabel>
            <Input marginTop={5} bg="white" w={"60%"} type="date" />
            <Text marginTop={5}>Resultado</Text>
          </Box>
          <Box margin={5} className="logins">
            <FormLabel>Logins</FormLabel>
            <Select bg="white" width="60">
              <option value="MAIL">Por email</option>
              <option value="IDFED">Por identidad federada</option>
            </Select>
            <FormLabel marginTop={5}>Desde...</FormLabel>
            <Input marginTop={5} bg="white" w={"60%"} type="date" />
            <Text marginTop={5}>Resultado</Text>
          </Box>
        </Box>

        <Box margin={5} className="blocked">
          <Text marginTop={5}>Cantidad de Usuarios Bloqueados: {(cantidadUsuariosBloqueados!=null)? (cantidadUsuariosBloqueados):("Cargando...")}</Text>
        </Box>
      </Box>
    </>
  );
}
