import React, { useEffect, useMemo, useState } from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import TableContainer from "../../components/containers/TableContainer";
import ModalContainer from "../../components/containers/ModalContainer";
import { Tooltip } from "@nextui-org/react";
import icon from "../../components/svgExporter";
import { publicApi } from "../../utils/app.utils";
import { useOrganisationStore } from "../../store/masterStore";
import toast from "react-hot-toast";

const columns = [
  { name: "Organizational ID", uid: "organizationId" },
  { name: "Organization Name", uid: "organizationName" },
  { name: "Email", uid: "email" },
  { name: "Type", uid: "type" },
  { name: "Mobile No.", uid: "mobile" },
  { name: "Actions", uid: "actions" },
];

const Organisations = () => {
  const [isActionModalOpen, setActionModal] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [form, setForm] = useState({});
  const { organization, setOrg } = useOrganisationStore(state => state);
  useEffect(() => {
    setLoading(true);
    publicApi
      .get("/api/v1/org")
      .then((res) => {
        setOrg(res.data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, [reload, setOrg]);

  const data = useMemo(() => {
    const newData = organization.map(e => {
      return {
        ...e,
        organizationId: e._id,
        // actions: e._id,
      }
    });
    return newData;
  }, [organization]);

  const handleActionsModal = ({ action, id = 0 }) => {
    if (action === "edit") {
      console.log(organization)
      const org = organization.find((e) => e._id === id);
      setForm({
        ...org,
      });
    } else if (action === "delete") {
      const org = organization.find((e) => e._id === id);
      setForm({
        ...org,
      });
    }
    setActionModal({
      ...isActionModalOpen,
      action: action,
      isOpen: true,
    });
  };
  const handleActionsModalClose = () => {
    setForm({});
    setActionModal({
      ...isActionModalOpen,
      isOpen: false,
      action: "",
    });
  };

  const handleSubmit = async (e) => {
    if (isActionModalOpen.action === "edit") {
      e.preventDefault();
      setLoading(true);
      await publicApi
        .put(`/api/v1/org/${form._id}`, form)
        .then((res) => {
          toast.success(res.data.message);
          setReload(!reload);
          setActionModal({
            ...isActionModalOpen,
            isOpen: false,
            action: "",
          });
          setForm({});
        })
        .catch((error) => toast.error(error.data.message))
        .finally(() => setLoading(false));
    } else if (isActionModalOpen.action === "add") {
      e.preventDefault();
      setLoading(true);
      await publicApi
        .post("/api/v1/org", form)
        .then((res) => {
          toast.success(res.data.message);
          setOrg(res.data.data);
          e.target.reset();
          setActionModal({
            ...isActionModalOpen,
            isOpen: false,
            action: "",
          });
          setForm({});
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setLoading(false));
    } else if (isActionModalOpen.action === "delete") {
      setLoading(true);
      await publicApi
        .delete(`/api/v1/org/${form._id}`)
        .then((res) => {
          toast.success(res.data.message);
          setReload(!reload);
          setActionModal({
            ...isActionModalOpen,
            isOpen: false,
            action: "",
          });
          setForm({});
        })
        .catch((error) => toast.error(error.response.data.message))
        .finally(() => setLoading(false));
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "organizationId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "organizationName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "type":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "mobile":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit Organisation" className="!text-white">
              <span
                onClick={() => {
                  handleActionsModal({
                    action: "edit",
                    id: user.organizationId,
                  })
                }
                }
                className="text-lg text-white cursor-pointer active:opacity-50"
              >
                <icon.FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Organisation">
              <span
                onClick={() => {
                  handleActionsModal({
                    action: "delete",
                    id: user.organizationId,
                  })
                }
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
            <p className="font-medium text-4xl">Create Organizations</p>
            <div className="flex items-center justify-end md:justify-center gap-4">
              <button onClick={() => setReload(!reload)} type="button">
                <icon.SlRefresh className="w-5 h-5 hover:rotate-[180deg] transition-all" />
              </button>
              <button
                type="button"
                onClick={() => handleActionsModal({ action: "add" })}
                className="bg-[#202020] border border-[#222222] px-10 py-2 rounded-md flex items-center justify-center gap-2"
              >
                Add
                <icon.CiCirclePlus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full gap-4 flex-col">
            <TableContainer
              aria={"Organization Table"}
              columns={columns}
              id={"organizationId"}
              data={data}
              renderCell={renderCell}
            />
          </div>
        </div>
      </div>
      <ModalContainer
        heading={
          isActionModalOpen.action === "edit"
            ? "Edit Organization"
            : isActionModalOpen.action === "add"
              ? "Add Organization"
              : "Delete Organization"
        }
        isOpen={isActionModalOpen.isOpen}
        onClose={handleActionsModalClose}
        cta={
          isActionModalOpen.action === "edit"
            ? "Edit Organization"
            : isActionModalOpen.action === "add"
              ? "Add Organization"
              : "Delete Organization"
        }
        formid={
          isActionModalOpen.action === "edit"
            ? "editorganization"
            : isActionModalOpen.action === "add"
              ? "addorganization"
              : ""
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
              Are you sure you want to delete this Organisation?
            </p>
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-center gap-1 flex-col py-2">
              <h1 className="capitalize text-sm font-medium">
                {isActionModalOpen.action === "add"
                  ? "Add Organization Details"
                  : "Edit Organization Details"}
              </h1>
              <p className="capitalize text-xs text-[#b3b3b3]">
                *all fields are required!
              </p>
            </div>
            <form
              id={
                isActionModalOpen.action === "edit"
                  ? "editorganization"
                  : isActionModalOpen.action === "add"
                    ? "addorganization"
                    : "deleteorganization"
              }
              onSubmit={handleSubmit}
              className="flex items-center justify-center gap-4 flex-col"
            >
              <div className="flex text-white items-center justify-center gap-4 w-full flex-col">
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.GoOrganization className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Organization Name"
                    name="organizationName"
                    onChange={handleInputChange}
                    value={form.organizationName || ""}
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.MdOutlineMailOutline className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                    value={form.email || ""}
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.LuClipboardType className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Organisation Type"
                    name="type"
                    required
                    onChange={handleInputChange}
                    value={form.type || ""}
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.CiMobile3 className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Mobile No."
                    name="mobile"
                    required
                    onChange={handleInputChange}
                    value={form.mobile || ""}
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

export default Organisations;
