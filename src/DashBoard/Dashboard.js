import React from 'react'
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { GoogleLogout } from "react-google-login";
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Navbar from "../components/Navbar.js"
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    plugins,
    options
    // tooltip,
    // options.plugins.tooltip,
} from 'chart.js';
//style
import '../Styles/Invoice.css';
import { DashBoardScreen, DashBoardNavigation, DashBoardSideBar, DashBoardContent, 
    DashBoardMain, DashBoardActionButtons, DashBoardActionTabs, 
     DashBoardActionTabsInput, DashBoardActionTabsLabel,TileDashBoard, DashBoardTabContent,DashBoardThreeDash,
    DashBoardNavigationLogo, DashBoardNavigationTitle, DashBoardNavigationSearch,
    Logoseparation,
    DashBoardNavigationDN,
    DashBoardNavigationDNInput,
    DashBoardNavigationNotification,
    DashBoardNavigationProfile,
    DashBoardSideBarSeperation,
    DashBoardSideBarButton,
    DashBoardSideBarSeperationBottom,
    LogoutBoxButton, LogoutBoxHighlight,DashBoardMultibox,DashBoardBox1,DashBoardBox2,DashBoardBox3,
    DashBoardBox4,DashBoardBox5,DashBoardBox6,DashBoardBox7,DashBoardBox8,DashBoardDate,DashBoardGraph,
    DashBoardGraphContent, TitleDashBoard,FieldDate} from './StyleDashboard';
import axios from 'axios';

const clientId = process.env.REACT_APP_CLIENTID;
const API_URL = process.env.REACT_APP_API_URL;



function Dashboard() {

        const [activeTab, setActiveTab] = useState('Proposed');
        const [activeLink, setActiveLink] = useState('Home');
        const Navigate = useNavigate();
    
        const handleTabChange = (e) => {
            setActiveTab(e);
            const winthdraw = async () => {
                const id = "616b4b3b4b3b4b3b4b3b4b3b";
            const response = await axios.post(`${API_URL}/withdraw`, { id: id });
            console.log(response);
            }
            winthdraw();
        }
    
        const handleLinkChange = (e) => {
            setActiveLink(e);
        }
    
        const onSuccess = () => {
            // alert("Logout made successfully");
            Cookies.remove('token');
            console.log("Logged Out...");
            window.location.href = "/";
        };
    
        const onFailure = () => {
            console.log("Handle failure cases");
        };
    
        // const handleApplyClick = () => {
        //     Navigate('/Apply');
        // };
    
        // const handleKeyDown = (event) => {
        //     if (event.key === 'Enter') {
        //         event.preventDefault();
        //         event.stopPropagation();
        //     }
        // };
    
        const [email, setEmail] = useState('');
        const [showEmail, setShowEmail] = useState(false);
        const [status, setStatus] = useState('ProposedCount');
    
        const toggleEmail = () => {
            setShowEmail(!showEmail);
        }
    
        // useEffect(() => {
        //     const token = Cookies.get('token');
        //     const getEmail = async () => {
        //         const response = await axios.get(`${API_URL}/user`, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         });
        //         setEmail(response.data.email);
        //     };
        //     getEmail();
        // }, []);
    
        const [proposedcount, setProposedCount] = useState(0);
        const [withdrawncount, setWithdrawnCount] = useState(0);
        const [approvedcount, setApprovedCount] = useState(0);
        const [rejectedcount, setRejectedCount] = useState(0);
        const [completedcount, setCompletedCount] = useState(0);
    
        const [month, setMonth] = useState("1");
        const [year, setYear] = useState("2023");
        const [date, setDate] = useState("1");
        const [dbdate, setDbDate] = useState('');
        const [dashboard, setDashboard] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']);
        // const [dashboard_data, setDashboard_data] = useState({});

        let count = 0;
        useEffect(() => {
            let today = new Date();
            let currentMonth = today.getMonth() + 1;
            let currentYear = today.getFullYear();
            let currentDate = today.getDate();

            setMonth(currentMonth);
            setYear(currentYear);
            setDate(currentDate);
            console.log(currentMonth, currentYear, currentDate);
            setDbDate(currentDate - 1);
            count = count + 1;
        }, [count == 0]);
    
        // useEffect(() => {
            
        // const dashboard_data = async() => {{

        // const response = await axios.post(`${API_URL}/dashboard`, { month: month, year: year, date: dbdate, status : status})
        // const livedata = await axios.post(`${API_URL}/dashboard-count`, { month: month, year: year, date: date, status : status})
        // console.log(livedata.data);
        // console.log(response);
        // // const randomNumbers = Array.from({ length: 31 }, () => Math.floor(Math.random() * 30) + 1);
        // setDashboard(response.data.dashboard);
        // setProposedCount(livedata.data.proposed);
        // setWithdrawnCount(livedata.data.withdrawn);
        // setApprovedCount(livedata.data.faculty_approved);
        // setRejectedCount(livedata.data.faculty_rejected);
        // setCompletedCount(livedata.data.faculty_completed);

        // console.log(response.data.proposedcount, response.data.withdrawncount, response.data.approvedcount, response.data.rejectedcount, response.data.completedcount);

        // // setDashboard(randomNumbers);

        // }}
        // dashboard_data();
        // }, [status, month, year]);
        
        const handledatechange = (e) => {
            console.log(e);
            const month = e.format('M');
            const year = e.format('YYYY');
            const date = e.format('D');
            setMonth(month);
            setYear(year);
            setDate(date);
            setDbDate(date - 1);
        }

        const [fromdate, setFromDate] = useState('2023-01-01');
        const [todate, setToDate] = useState('2023-12-31');
        const [overallcount, setOverallCount] = useState(0);

        // const [newStatus, setNewStatus] = useState('Proposed');

        let refresh = 0;
        useEffect(async() => {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];
            console.log("Today: ", formattedDate);
            const response = await axios.post(`${API_URL}/live-count`)
            console.log("---->",response.data);
            setProposedCount(response.data.ProposedCount);
            setWithdrawnCount(response.data.WithdrawnCount);
            setApprovedCount(response.data.Faculty_ApprovedCount);
            setRejectedCount(response.data.Faculty_RejectedCount);
            setCompletedCount(response.data.Faculty_CompletedCount);
            refresh = refresh + 1;
        }, [refresh === 0]);

        useEffect(() => {
            if(fromdate && todate && status){
            const dashboard_data = async() => {{
            const response = await axios.post(`${API_URL}/overall-count`, { startDate: fromdate, endDate: todate, status : status})
            console.log(response);
            // setDashboard(response.data.dashboard);
            // setOverallCount(response.data.overallcount);
            setOverallCount(response.data.overallcount);
            }}
            dashboard_data();
            }
        }, [fromdate, todate, status]); 

        const handlefromdate = (e) => {
            console.log(e);
            const fromdate = e.format('YYYY-MM-DD');
            setFromDate(fromdate);
            console.log(fromdate);
        }

        const handletodate = (e) => {
            console.log(e);
            const todate = e.format('YYYY-MM-DD');
            setToDate(todate);
            console.log(todate);
        }



        const data = {
        labels: Array.from({ length: dashboard.length }, (_, index) => index + 1),
        datasets: [
            {
            label: 'Count',
            data: dashboard,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
        };
    
        const options = {
        scales: {
            x: {
            title: {
                display: true,
                text: 'Date',
                font: {
                size: 12,
                },
            },
            },
            y: {
            title: {
                display: true,
                text: 'Count',
                font: {
                size: 12,
                },
            },
            beginAtZero: true,
            },
        },
        plugins: {
            legend: {
            display: true,
            position: 'right',
            labels: {
                font: {
                size: 12,
                },
            },
            },
            tooltip: {
            enabled: true,
            callbacks: {
                label: function (context) {
                return 'Count' + ': ' + context.parsed.y;
                },
            },
            },
        },
        };
    
        ChartJS.register(
            // Legend,
            // plugins.tooltip,
            // options.plugins.tooltip,
            // tooltip,
            LineElement,
            CategoryScale,
            LinearScale,
            PointElement,
        );
    
        const handlestatuschange = (e) => {
            console.log(e);
            setStatus(e);
        }

        
  return (
    <DashBoardScreen>
        <Navbar />
            <DashBoardContent >
                <TitleDashBoard className='title-dashboard'>Student Dashboard</TitleDashBoard>
                <DashBoardMain>
                    <div className="Multi-box">
                    <DashBoardBox1 className="grid-box" onClick={() => handlestatuschange("Proposed")} style={{cursor: "pointer"}}> <p>Proposed</p><span>  {(proposedcount) ? proposedcount : "0"}</span></DashBoardBox1>
                    <DashBoardBox2 className="grid-box" onClick={() => handlestatuschange("WithdrawnCount")} style={{cursor: "pointer"}}><p>Withdrawn</p> <span>{withdrawncount}</span> </DashBoardBox2>
                    <DashBoardBox3 className="grid-box" onClick={() => handlestatuschange("Faculty_ApprovedCount")} style={{cursor: "pointer"}}><p>Approved</p> <span> {approvedcount}</span></DashBoardBox3>
                    <DashBoardBox4 className="grid-box" onClick={() => handlestatuschange("Faculty_RejectedCount")} style={{cursor: "pointer"}}><p>Rejected</p> <span> {rejectedcount}</span></DashBoardBox4>
                    <DashBoardBox5 className="grid-box" onClick={() => handlestatuschange("Faculty_CompletedCount")} style={{cursor: "pointer"}}><p>Completed</p> <span> {completedcount}</span></DashBoardBox5>
                    <DashBoardBox5 className="grid-box" style={{cursor: "initial"}}><p>Count</p> <span> {overallcount}</span></DashBoardBox5>
                        {/* <DashBoardBox6 className="grid-box"></DashBoardBox6>
                        <DashBoardBox7 className="grid-box"></DashBoardBox7>
                        <DashBoardBox8 className="grid-box"></DashBoardBox8> */}
                    </div>
                    
                    <TitleDashBoard>Graph:</TitleDashBoard>
                    <DashBoardGraphContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={[
                            'DatePicker',
                            ]}
                        >
                            <DemoItem label="Pick Date">
                                <MobileDatePicker className='dashboard-date' onChange={handledatechange}/>
                                <MobileDatePicker className='dashboard-date' onChange={handlefromdate}/>
                                <MobileDatePicker className='dashboard-date' onChange={handletodate}/>
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                    </DashBoardGraphContent>
                    <DashBoardGraph>
                        <Line
                            data={data}
                            style = {{ height : "100%", width : "100%", margin : "20px"}}
                            // height={400}
                            // width={600}
                            options={options}
                        />
                    </DashBoardGraph>
                </DashBoardMain>
            </DashBoardContent>
    </DashBoardScreen>
  )
}

export default Dashboard;