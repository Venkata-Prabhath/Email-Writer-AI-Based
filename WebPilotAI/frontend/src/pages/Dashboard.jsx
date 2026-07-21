import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import DashboardHero from "../components/dashboard/DashboardHero";
import QuickActions from "../components/dashboard/QuickActions";
import RecentTasks from "../components/dashboard/RecentTasks";

const Dashboard = () => {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadTasks();

  }, []);

  const loadTasks = async () => {

    try {

      const data = await getTasks();

      setTasks(data);

    } catch (e) {

      console.log(e);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="space-y-8">

      <DashboardHero />

      <QuickActions />

      <RecentTasks
        loading={loading}
        tasks={tasks}
      />

    </div>

  );

};

export default Dashboard;