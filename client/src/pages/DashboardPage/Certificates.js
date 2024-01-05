import React, { useEffect, useState } from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import TableContainer from "../../components/containers/TableContainer";
import ModalContainer from "../../components/containers/ModalContainer";
import { Tooltip } from "@nextui-org/react";
import icon from "../../components/svgExporter";


const columns = [
  { name: "Certificate ID", uid: "certificateId" },
  { name: "Student Name", uid: "studentName" },
  { name: "Student Mobile", uid: "studentMobile" },
  { name: "Student Roll", uid: "studentRoll" },
  { name: "Events Name", uid: "eventsName" },
  { name: "Actions", uid: "actions" },
];

const users = [
  {
    certificateId: "#20462",
    studentName: "lorem ipsum",
    studentMobile: "+919416829839",
    studentRoll: "2110991573",
    eventsName: "2023-12-11",
  },
];

const Certificates = () => {
  const [isActionModalOpen, setActionModal] = useState({});
  const [form, setForm] = useState({});
  const [csv, setCsvUpload] = useState({});
  const [reload, setReload] = useState(false)
  const handleFileChange = (e) => {
    setCsvUpload({
      file: e.target.files[0],
      uploaded: true,
    });
  };

  useEffect(() => {
    if (csv.uploaded) {
      console.log("Upload initiated");

      // setCsvUpload({  })
    }
  }, [csv.uploaded]);

  const handleSubmit = (e) => {
    if (isActionModalOpen.action === "edit") {
      e.preventDefault();
      console.log("edit");
    } else if (isActionModalOpen.action === "delete") {
      console.log("delete");
    }
  };
  const handleActionsModal = ({ action, id = 0 }) => {
    setActionModal({
      ...isActionModalOpen,
      action: action,
      isOpen: true,
    });
    if (action === "edit") {
      setForm({
        ...form,
        boardroomId: id,
      });
    } else if (action === "delete") {
      setForm({
        boardroomId: id,
      });
    }
  };
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleActionsModalClose = () => {
    setActionModal({
      ...isActionModalOpen,
      isOpen: false,
      action: "",
    });
    setForm({});
  };
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "certificateId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "studentName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "studentMobile":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "studentRoll":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "eventsName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit Certificate" className="!text-white">
              <span
                onClick={() =>
                  handleActionsModal({ action: "edit", id: user.certificateId })
                }
                className="text-lg text-white cursor-pointer active:opacity-50"
              >
                <icon.FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Certificate">
              <span
                onClick={() =>
                  handleActionsModal({
                    action: "delete",
                    id: user.certificateId,
                  })
                }
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <icon.MdOutlineDelete />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <DashboardContainer>
      <div className="flex items-center justify-center w-full h-full px-2">
        <div className="flex items-center justify-center w-full h-full flex-col gap-8">
          <div className="flex items-end md:items-center justify-between text-white w-full md:flex-row flex-col gap-4">
            <p className="font-medium text-4xl">Upload Csv</p>
            <div className="flex items-center justify-end md:justify-center gap-4">
              <button type="button" onClick={() => setReload(!reload)}>
                <icon.SlRefresh className="w-5 h-5 hover:rotate-[180deg] transition-all" />
              </button>
              <label
                htmlFor="upload"
                className="bg-[#202020] border border-[#222222] px-10 py-2 rounded-md flex items-center justify-center gap-2"
              >
                {csv.uploaded ? "File Upload Done" : "Upload"}
                <icon.MdUpload className="w-4 h-4" />
                <input
                  hidden
                  type="file"
                  multiple={false}
                  accept=".xlsx,.csv"
                  id="upload"
                  name="upload"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full gap-4 flex-col">
            <TableContainer
              aria={"Certificate Table"}
              columns={columns}
              id={"certificateId"}
              data={users}
              renderCell={renderCell}
            />
          </div>
        </div>
      </div>
      <ModalContainer
        heading={
          isActionModalOpen.action === "edit"
            ? "Edit Details"
            : "Delete Student"
        }
        isOpen={isActionModalOpen.isOpen}
        onClose={handleActionsModalClose}
        cta={
          isActionModalOpen.action === "edit"
            ? "Edit Student Details"
            : "Delete Student"
        }
        formid={
          isActionModalOpen.action === "edit"
            ? "editstudentdetails"
            : "deletestudent"
        }
        onSubmit={handleSubmit}
        ctaClass={isActionModalOpen.action === "delete" ? "danger" : "primary"}
        scrollBehavior=""
        modalClass="text-white"
        enableFooter={true}
      >
        {isActionModalOpen.action === "delete" ? (
          <div className="w-full flex items-center justify-center">
            <p className="p-2 text-center flex items-center justify-center font-bold">
              Are you sure you want to delete this student
            </p>
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-center gap-1 flex-col py-2">
              <h1 className="capitalize text-sm font-medium">
                {"Edit Students Details"}
              </h1>
              <p className="capitalize text-xs text-[#b3b3b3]">
                *all fields are required!
              </p>
            </div>
            <form
              id="editstudentdetails"
              onSubmit={handleSubmit}
              className="flex items-center justify-center gap-4 flex-col"
            >
              <div className="flex items-center justify-center gap-4 w-full flex-col">
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.GrCertificate className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Certificate Id"
                    onChange={handleInputChange}
                    value={form.certificateId || ""}
                    name="certificateId"
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.PiStudent className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Student Name"
                    onChange={handleInputChange}
                    value={form.studentName || ""}
                    name="studentName"
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.CiMobile3 className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Student Mobile"
                    onChange={handleInputChange}
                    value={form.studentMobile || ""}
                    name="studentMobile"
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.FaRegAddressCard className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Student Roll"
                    onChange={handleInputChange}
                    value={form.studentRoll || ""}
                    name="studentRoll"
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.MdEventNote className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Event Name"
                    onChange={handleInputChange}
                    value={form.eventName || ""}
                    name="eventName"
                    required
                  />
                </div>
              </div>
            </form>
          </>
        )}
      </ModalContainer>
    </DashboardContainer>
  );
};

export default Certificates;
