import { GATEWAY_URL, PAGE_UNAVAILABLE_MSG } from "./Constants";
import { GetUserContext } from "./UserContext";
import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { myBackgroundColor } from "./styles";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Center,
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
  Heading,
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
  const [tipoLogin, setTipoLogin] = useState("All");
  const [tipoRegistro, setTipoRegistro] = useState("All");
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

  async function handleGetAllLogins() {
    try {
      let token = context.token.value();
      let forMail = await tryGetAmountLogins(
        token,
        "mailpassword",
        fechaLogin
      );
      let forFed = await tryGetAmountLogins(
        token,
        "federatedidentity",
        fechaLogin
      );
      setCantidadLogins(forMail.data + forFed.data);
    } catch (e) {
      console.log(e);
      setCantidadLogins(null);
      alert("No se pudo obtener la cantidad de logins");
    }
  }

  useEffect(() => {
    const getMetricasLogins = async () => {
      if (!tipoLogin || !fechaLogin) return;
      if (tipoLogin === "All" && fechaLogin) {
        handleGetAllLogins();
        return;
      }

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

  async function handleGetAllRegisters() {
    try {
      let token = context.token.value();
      let forMail = await tryGetAmountRegisters(
        token,
        "mailpassword",
        fechaRegistro
      );
      let forFed = await tryGetAmountRegisters(
        token,
        "federatedidentity",
        fechaRegistro
      );
      setCantidadRegistros(forMail.data + forFed.data);
    } catch (e) {
      console.log(e);
      setCantidadRegistros(null);
      alert("No se pudo obtener la cantidad de registros");
    }
  }

  useEffect(() => {
    const getMetricasRegistros = async () => {
      if (!tipoRegistro || !fechaRegistro) return;
      if (tipoRegistro === "All" && fechaRegistro) {
        handleGetAllRegisters();
        return;
      }
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
    setTipoRegistro(filtro);
  }
  function seleccionarFechaRegistro(e) {
    const fecha = e.target.value;
    setFechaRegistro(fecha);
  }
  function seleccionarTipoLogin(e) {
    const filtro = e.target.value;
    setTipoLogin(filtro);
  }
  function seleccionarFechaLogin(e) {
    const fecha = e.target.value;
    setFechaLogin(fecha);
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
          <Box
            margin={5}
            className="registrations"
            rounded={"lg"}
            bg="gray.100"
            boxShadow={"lg"}
            p={8}
          >
            <FormLabel fontSize={20} fontWeight={"bold"} >Registros</FormLabel>
            <Select
              bg="white"
              width="60"
              borderColor={"black"}
              onChange={seleccionarTipoRegistro}
            >
              <option value="All">Todos</option>
              <option value="mailpassword">Por email</option>
              <option value="federatedidentity">Por identidad federada</option>
            </Select>
            <FormLabel fontSize={20} fontWeight={"bold"} marginTop={5}>Desde...</FormLabel>
            <Input
              borderColor={"black"}
              bg="white"
              w={"60%"}
              type="date"
              onChange={seleccionarFechaRegistro}
            />

            <Stat marginTop={5}>
              <StatLabel fontSize={"md"}>Cantidad</StatLabel>
              <StatNumber>{cantidadRegistros}</StatNumber>
              <StatHelpText>{fechaRegistro ? (fechaRegistro + " | Actualidad"): ("Sin datos")}</StatHelpText>
            </Stat>
          </Box>
          <Box
            margin={5}
            className="logins"
            rounded={"lg"}
            bg="gray.100"
            boxShadow={"lg"}
            p={8}
          >
            <FormLabel fontSize={20} fontWeight={"bold"}>Logins</FormLabel>
            <Select
              bg="white"
              width="60"
              onChange={seleccionarTipoLogin}
              borderColor={"black"}
            >
              <option value="All">Todos</option>
              <option value="mailpassword">Por email</option>
              <option value="federatedidentity">Por identidad federada</option>
            </Select>
            <FormLabel fontSize={20} fontWeight={"bold"} marginTop={5}>Desde...</FormLabel>
            <Input
              bg="white"
              w={"60%"}
              type="date"
              borderColor={"black"}
              onChange={seleccionarFechaLogin}
            />
            <Stat marginTop={5}>
              <StatLabel fontSize={"md"}>Cantidad</StatLabel>
              <StatNumber>{cantidadLogins}</StatNumber>
              <StatHelpText>{fechaLogin ? (fechaLogin + " | Actualidad"): ("Sin datos")}</StatHelpText>
            </Stat>
          </Box>
          
        </Box>

        <Box
          margin={5}
          className="blocked"
          rounded={"lg"}
          bg="gray.100"
          boxShadow={"lg"}
          p={8}
          width={"-moz-fit-content"}
        >
          {cantidadUsuariosBloqueados != null ? (
            <Heading size="lg" marginTop={5}>
              {" "}
              Cantidad de Usuarios Bloqueados: {cantidadUsuariosBloqueados}{" "}
            </Heading>
          ) : (
            <Center>
              <Spinner marginTop={2} size="xl" />
            </Center>
          )}
        </Box>
      </Box>
    </>
  );
}

/**/ 