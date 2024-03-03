import React from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import DashboardHomeCard from "../../components/pagesComponents/dashboardPage/DashboardHomeCard";
import AnalyticCard from "../../components/pagesComponents/dashboardPage/AnalyticCard";
import { useAuthStore } from "../../store/masterStore";
import { publicApi } from "../../utils/app.utils";

const Home = () => {
  const { user, token } = useAuthStore(state => state)
  const [data, setData] = React.useState({
    events: [],
    org: [],
    templates: []
  });
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    publicApi.get("/api/v1/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setData({
          events: res.data.events,
          org: res.data.organizations,
          templates: res.data.templates
        })
        setLoading(false)
      }).catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, []);
  return (
    <DashboardContainer>
      <div className="flex items-center justify-center w-full h-full px-2">
        <div className="flex items-center justify-center w-full h-full flex-col gap-8">
          <div className="flex items-center justify-start w-full">
            <p className="text-white font-medium text-4xl">Welcome! {user?.name}</p>
          </div>
          <div className="flex items-center justify-center w-full h-full gap-4 flex-col">
            <div className="w-full grid md:grid-cols-3 grid-cols-1 items-center justify-center gap-4">
              <DashboardHomeCard text={"Organisation Created"} value={data.org.length ?? 0} />
              <DashboardHomeCard text={"Events Created"} value={data.events.length ?? 0} />
              <DashboardHomeCard text={"Subscription Plan"} value={"Free"} />
            </div>
            <div className="w-full grid md:grid-cols-2 grid-cols-1 items-center justify-center gap-4">
              <div className="w-full md:col-span-2 lg:col-span-1 flex items-start justify-center gap-4 flex-col md:flex-row lg:flex-col">
                <AnalyticCard heading={"Most Template Used"} data={data.templates} type="template" />
                <AnalyticCard heading={"Most Active Organisation"} data={data.org} type="org" />
              </div>
              <div className="flex items-center justify-center text-white md:hidden lg:flex flex-col p-4 gap-4 w-full rounded-md bg-[#181818] border border-[#222222]">
                <div className="flex items-center justify-center px-2 w-full flex-col gap-4">
                  <div className="flex items-center justify-center w-full">
                    <p className="text-2xl font-medium">Demo Video</p>
                  </div>
                  <div className="flex items-center justify-center w-full h-full">
                    <iframe width="500" height="250" src="https://www.youtube.com/embed/iimhCXhK3is?si=5xjKhhjVru68wbr5" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Home;
