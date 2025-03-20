import SweetAlert from "react-bootstrap-sweetalert";
function SweetAlertComponent({ confirm, cancel, title, subtitle, type }) {
  return (
    <SweetAlert
      style={{ zIndex: "1" }}
      title={title}
      onConfirm={confirm}
      // type="danger"
      type={type !== undefined ? type : "danger"}
      showCancel={true}
      confirmBtnStyle={{ backgroundColor: "#04AA6D",
        border: "none",
        color: "white",
        padding: "10px 20px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        borderRadius: "4px" ,
        cursor: "pointer" ,
      margin: "10px 10px" }}
      onCancel={cancel}
      cancelBtnStyle={{ backgroundColor: "#f44336",
        border: "none",
        color: "white",
        padding: "10px 20px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        borderRadius: "4px" ,
        cursor: "pointer" ,
        margin: "10px 10px" }}
    >
      <h5> {subtitle} </h5>
    </SweetAlert>
  );
}

export default SweetAlertComponent;