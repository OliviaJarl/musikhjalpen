import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import YearsPage from "./pages/YearsPage";
import StatisticsPage from "./pages/StatisticsPage";
import YearDetailPage from "./pages/YearDetailPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
    {    
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
            {index: true, element: <HomePage/>},
            {path: "/years", element: <YearsPage />},
            {path: "/years/:id", element: <YearDetailPage/>},
            {path: "/statistics", element: <StatisticsPage/>},
        ]
    }
])

export default router;