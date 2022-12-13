import { PAGE_UNAVAILABLE_MSG } from "./Constants";
import { GetUserContext } from "./UserContext";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormLabel,
  Input,
  FormControl,
  Switch,
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
export default function ReglasCotizacion() {
  const context = GetUserContext();
  const [lunes, setLunes] = useState(false);
  const [martes, setMartes] = useState(false);
  const [miercoles, setMiercoles] = useState(false);
  const [jueves, setJueves] = useState(false);
  const [viernes, setViernes] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);

  let days = {
    Lunes: [lunes, setLunes],
    Martes: [martes, setMartes],
    Miercoles: [miercoles, setMiercoles],
    Jueves: [jueves, setJueves],
    Viernes: [viernes, setViernes],
    Sabado: [sabado, setSabado],
    Domingo: [domingo, setDomingo],
  };

  useEffect(() => {
    for (let day in days) {
      if (days[day][0]) console.log(day + "Activado");
    }
    console.log("--------------------");
  }, [lunes, martes, miercoles, jueves, viernes, sabado, domingo]);

  if (!context.userStatus.isLoggedIn) {
    return <h2>{PAGE_UNAVAILABLE_MSG}</h2>;
  }
  return (
    <>
      <Box
        justifyContent={"space-evenly"}
        alignItems={"center"}
        display={"flex"}
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
        <Box>
          <FormLabel marginTop={2}>Precio Base</FormLabel>
          <Input
            marginTop={2}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Precio base..."
          />
          <FormLabel marginTop={2}>Costo de duracion</FormLabel>
          <Input
            marginTop={2}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Costo de duracion..."
          />
          <FormLabel marginTop={2}>Costo de distancia</FormLabel>
          <Input
            marginTop={2}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Costo de distancia..."
          />
        </Box>
        <Box>
          <FormLabel marginBottom={4}>
            Dias de la semana en los que se cobra extra
          </FormLabel>
          <FormControl display="column" alignItems="center">
            {Object.keys(days).map((day) => {
              let { 0: value, 1: setValue } = days[day];
              return (
                <Box key={day}>
                  <FormLabel htmlFor="email-alerts" mb="0">
                    {day}
                  </FormLabel>
                  <Switch
                    color="teal"
                    onChange={() => {
                      setValue(!value);
                    }}
                  />
                </Box>
              );
            })}
          </FormControl>
        </Box>
        <Box>
          <FormLabel>Horas en las que se cobra extra</FormLabel>
        </Box>
      </Box>
    </>
  );
}
