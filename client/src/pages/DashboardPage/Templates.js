import React, { useEffect, useState } from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import {
  useAuthStore,
  useCsvStore,
  useEventsStore,
  useOrganisationStore,
  useTemplateStore,
} from "../../store/masterStore";
import { publicApi } from "../../utils/app.utils";
import toast from "react-hot-toast";

const Templates = () => {
  const token = useAuthStore((state) => state.token);
  const [form, setForm] = React.useState({});
  const { organization, setOrg } = useOrganisationStore((state) => state);
  const { events, setEvents } = useEventsStore((state) => state);
  const { template, setTemplate } = useTemplateStore((state) => state);
  const { csv } = useCsvStore((state) => state);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      publicApi
        .get("/api/v1/template", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTemplate(res.data.templates);
          setEvents(res.data.events);
          setOrg(res.data.organizations);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setForm({
      ...form,
      data: csv,
    });
  }, [reload]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    if (!form.template) {
      return toast.error("Select a template first!");
    } else if (!form.organizationName) {
      return toast.error("Select an organization!");
    } else if (!form.eventName) {
      return toast.error("Select an Event!");
    }
    try {
      setLoading(true);
      toast.loading("Sending Mail Certificates! 🚀", {
        duration: 2000,
      });
      await publicApi
        .post(
          "/api/v1/certificate",
          { ...form },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setTimeout(() => {
            toast.success(`${res.data.message}! 🔥`);
          }, 3000);
          setReload(!reload);
          setForm({});
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardContainer>
      <div className="flex items-center justify-center w-full h-full px-2">
        <div className="w-full flex items-center justify-center flex-col gap-4">
          <div className="w-full flex items-center md:flex-row flex-col justify-between gap-4">
            <div className="flex items-center gap-4 justify-center sm:flex-row flex-col">
              <div className="flex items-center justify-center bg-[#181818] border border-[#222222] p-2">
                <select
                  value={form.organizationName || ""}
                  name="organizationName"
                  onChange={handleChange}
                  className="outline-none border-0 !bg-transparent text-white"
                >
                  <option disabled value="">
                    Select Organization
                  </option>
                  {organization?.map((org) => (
                    <option
                      className="bg-[#181818]"
                      key={org._id}
                      value={org.organizationName}
                    >
                      {org.organizationName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-center bg-[#181818] border border-[#222222] p-2">
                <select
                  value={form.eventName || ""}
                  name="eventName"
                  onChange={handleChange}
                  className="outline-none border-0 !bg-transparent text-white"
                >
                  <option disabled value="">
                    Select Event
                  </option>
                  {events?.map((event) => (
                    <option
                      className="bg-[#181818]"
                      key={event._id}
                      value={event.eventName}
                    >
                      {event.eventName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={() => handleSubmit()}
                disabled={loading}
                type="button"
                className="bg-[#202020] border border-[#222222] px-6 text-sm xl:text-base xl:px-10 py-2 rounded-md flex items-center justify-center gap-2"
              >
                <p className="text-white font-medium">
                  {form.template ? "Send" : "Select Template First"}
                </p>
              </button>
            </div>
          </div>
          <div className="w-full grid items-center justify-center gap-6 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {!template?.length > 0 ? (
              <p className="text-white font-bold text-center w-full md:col-span-3 sm:col-span-2 col-span-1 py-10">
                No templates found
              </p>
            ) : (
              template.map((temp) => (
                <div
                  key={temp._id}
                  onClick={() => {
                    setForm({ ...form, template: temp._id });
                  }}
                  className="flex items-center relative justify-center w-full h-full flex-col gap-3"
                >
                  <div className="flex w-full h-full items-center justify-center">
                    <img
                      src={temp.templateImage}
                      alt={temp.templateName}
                      className="w-full h-full lg:h-full xl:h-60 object-cover rounded-md"
                    />
                  </div>
                  <div className="absolute right-3 top-2 flex items-center justify-center">
                    <p className="text-black font-bold">{temp.templateName}</p>
                  </div>
                  <div className="absolute left-3 bottom-2 flex items-center justify-center">
                    <p className="text-xs rounded-md px-4 py-1 bg-primary text-white font-bold transition-all duration-200">
                      {form.template &&
                        (form.template === temp._id ? "Selected" : "")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Templates;
