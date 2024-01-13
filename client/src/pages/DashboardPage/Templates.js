import React from 'react'
import DashboardContainer from '../../components/containers/DashboardContainer'
import { useCsvStore, useEventsStore, useOrganisationStore, useTemplateStore } from '../../store/masterStore'

const Templates = () => {
  const [form, setForm] = React.useState({});
  const { organization } = useOrganisationStore(state => state);
  const { events } = useEventsStore(state => state);
  const {csv} = useCsvStore(state => state);  
  //const { template } = useTemplateStore();
  const template = [
    {
      _id: 1,
      name: 'Template 1',
      image: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg',
    },
    {
      _id: 2,
      name: 'Template 2',
      image: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg',

    },
    {
      _id: 3,
      name: 'Template 3',
      image: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg',

    },
    {
      _id: 4,
      name: 'Template 4',
      image: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg',

    },
    {
      _id: 5,
      name: 'Template 5',
      image: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg',

    },
    {
      _id: 6,
      name: 'Template 6',
      image: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg',
    }
  ]
  return (
    <DashboardContainer>
      <div className="flex items-center justify-center w-full h-full px-2">
        <div className="w-full flex items-center justify-center flex-col gap-4">
           <div className="w-full flex items-center md:flex-row flex-col justify-between gap-4">
            <div className="flex items-center gap-4 justify-center sm:flex-row flex-col">
              <div className="flex items-center justify-center bg-[#181818] border border-[#222222] p-2">
                <select value={form.organizationName || ""} className='outline-none border-0 !bg-transparent text-white'>
                  <option disabled value="">Select Organization</option>
                  {organization.map((org) => (
                    <option className='bg-[#181818]' key={org._id} value={org.name}>
                      {org.organizationName}
                    </option>
                  )
                  )}
                </select>
              </div>
              <div className="flex items-center justify-center bg-[#181818] border border-[#222222] p-2">
                <select value={form.eventsName || ""} className='outline-none border-0 !bg-transparent text-white'>
                  <option disabled value="">Select Event</option>
                  {events.map((event) => (
                    <option className='bg-[#181818]' key={event._id} value={event.name}>
                      {event.eventName}
                    </option>
                  )
                  )}
                </select>
              </div>
              </div>

              <div className='flex items-center justify-center'>
                <button className="bg-[#202020] border border-[#222222] px-10 py-2 rounded-md flex items-center justify-center gap-2">
                  <p className='text-white font-bold'>{(form.temp && csv) ? "Create" : "Upload Csv First"}</p>
                </button> 
              </div>
            </div>
             <div className="w-full grid items-center justify-center gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
              {template.map((temp) => (
                <div key={temp._id} onClick={()=>{setForm(
                  ...form,
                  temp
                )}} className="flex items-center relative justify-center w-full h-full flex-col gap-3">
                    <div className="flex w-full h-full items-center justify-center">
                      <img src={temp.image} alt={temp.name} className="w-full h-full lg:h-full xl:h-60 xl:object-cover xl:object-center object-contain rounded-md" />
                    </div>
                    <div className="absolute right-3 top-2 flex items-center justify-center">
                      <p className='text-white font-bold'>{temp.name}</p>
                    </div>
                </div>
              )
              )}
             </div>
        </div>
      </div>
    </DashboardContainer>
  )
}

export default Templates