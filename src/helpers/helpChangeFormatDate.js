export const changeFormatDay = (day) => {
    switch (day) {
      case 0:
        return "domingo";
      case 1:
        return "lunes";
      case 2:
        return "martes";
      case 3:
        return "miercoles";
      case 4:
        return "jueves";
      case 5:
        return "vieres";
      case 6:
        return "sábado";
      default:
        throw new Error("invalid day");
    }
  };
  
export const changeFormatMonth = (month) => {
    switch (month) {
      case 0:
        return "enero";
      case 1:
        return "febrero";
      case 2:
        return "marzo";
      case 3:
        return "abril";
      case 4:
        return "mayo";
      case 5:
        return "junio";
      case 6:
        return "julio";
      case 7:
        return "agosto";
      case 8:
        return "septiembre";
      case 9:
        return "octubre";
      case 10:
        return "noviembre";
      case 11:
        return "diciembre";
      default:
        throw new Error("invalid month");
    }
  };