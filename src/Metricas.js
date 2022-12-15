import { GATEWAY_URL, PAGE_UNAVAILABLE_MSG } from "./Constants";
import { GetUserContext } from "./UserContext";
import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import {myBackgroundColor} from "./styles"
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
import {
  tryGetAmountBlockedUsers,
  tryGetAmountLogins,
  tryGetAmountRegisters,
} from "./Backend";

export default function Metricas() {
  const [cantidadUsuariosBloqueados, setCantidadUsuariosBloqueados] =
    useState(null);
  const context = GetUserContext();
  const [tipoLogin, setTipoLogin] = useState("mailpassword");
  const [tipoRegistro, setTipoRegistro] = useState("mailpassword");
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [fechaLogin, setFechaLogin] = useState("");
  const [cantidadLogins, setCantidadLogins] = useState();
  const [cantidadRegistros, setCantidadRegistros] = useState();

  useEffect(() => {
    const getUsuariosBloqueados = async () => {
      try {
        let token = context.token.value();
        let response = await tryGetAmountBlockedUsers(token);
        setCantidadUsuariosBloqueados(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUsuariosBloqueados();
  }, []);

  useEffect(() => {
    const getMetricasLogins = async () => {
      if (!tipoLogin || !fechaLogin) return;

      try {
        let token = context.token.value();
        let response = await tryGetAmountLogins(token, tipoLogin, fechaLogin);
        setCantidadLogins(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMetricasLogins();
  }, [tipoLogin, fechaLogin]);

  useEffect(() => {
    const getMetricasRegistros = async () => {
      if (!tipoRegistro || !fechaRegistro) return;
      try {
        let token = context.token.value();
        let response = await tryGetAmountRegisters(
          token,
          tipoRegistro,
          fechaRegistro
        );
        setCantidadRegistros(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMetricasRegistros();
  }, [tipoRegistro, fechaRegistro]);

  if (!context.userStatus.isLoggedIn) {
    return <h2>{PAGE_UNAVAILABLE_MSG}</h2>;
  }
  function seleccionarTipoRegistro(e) {
    const filtro = e.target.value;
    setTipoLogin(filtro);
    console.log(filtro);
  }
  function seleccionarFechaRegistro(e) {
    const fecha = e.target.value;
    setFechaRegistro(fecha);
    console.log(fecha);
  }
  function seleccionarTipoLogin(e) {
    const filtro = e.target.value;
    setTipoRegistro(filtro);
    console.log(filtro);
  }
  function seleccionarFechaLogin(e) {
    const fecha = e.target.value;
    setFechaLogin(fecha);
    console.log(fecha);
  }

  return (
    <>
      <Box
        overflowY="auto"
        m="10"
        maxH="full"
        rounded="sm"
        bg={myBackgroundColor}
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
            <Select bg="white" width="60" borderColor={"black"} onChange={seleccionarTipoRegistro} >
              <option value="mailpassword">Por email</option>
              <option value="federatedidentity">Por identidad federada</option>
            </Select>
            <FormLabel marginTop={5}>Desde...</FormLabel>
            <Input
              borderColor={"black"}
              marginTop={5}
              bg="white"
              w={"60%"}
              type="date"
              onChange={seleccionarFechaRegistro}
            />

            <Text marginTop={5}>
              {cantidadRegistros != null && tipoRegistro && fechaRegistro
                ? "Cantidad: " + cantidadRegistros
                : "Ingrese datos para ver la cantidad de registros"}{" "}
            </Text>
          </Box>
          <Box margin={5} className="logins">
            <FormLabel>Logins</FormLabel>
            <Select
              bg="white"
              width="60"
              onChange={seleccionarTipoLogin}
              borderColor={"black"}
            >
              <option value="mailpassword">Por email</option>
              <option value="federatedidentity">Por identidad federada</option>
            </Select>
            <FormLabel marginTop={5}>Desde...</FormLabel>
            <Input
              marginTop={5}
              bg="white"
              w={"60%"}
              type="date"
              borderColor={"black"}
              onChange={seleccionarFechaLogin}
            />
            <Text marginTop={5}>
              {cantidadLogins != null && tipoLogin && fechaLogin
                ? "Cantidad: " + cantidadLogins
                : "Ingrese datos para ver la cantidad de logins"}
            </Text>
          </Box>
        </Box>

        <Box margin={5} className="blocked">
          
            {cantidadUsuariosBloqueados != null
              ? (<Text marginTop={5}> Cantidad de Usuarios Bloqueados: {cantidadUsuariosBloqueados} </Text>)
              : (<Spinner marginTop={2} size="xs"/>)}
        </Box>
      </Box>
    </>
  );
}
