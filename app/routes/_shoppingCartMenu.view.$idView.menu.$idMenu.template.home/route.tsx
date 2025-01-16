//REMIX
import { Outlet, Link } from "@remix-run/react";
//TELERIK
import { GridLayout } from '@progress/kendo-react-layout';

export default function Home() {
    return (
        <>
        <Link to="/redirect/view/17/menu/1"> ir a lista de productos</Link>
            <GridLayout className="cms-home-body-grid cms-home-body" >
                {/* <div className="cms-div-1" ></div>
                <div className="cms-div-2"></div>
                <div className="cms-div-3"></div>
                <div className="cms-div-4"></div>
                <div className="cms-div-5"></div>
                <div className="cms-div-6"></div>
                <div className="cms-div-7"></div>
                <div className="cms-div-8"></div>
                <div className="cms-div-9"></div>
                <div className="cms-div-10"></div> */}
                <Outlet />
            </GridLayout>
        </>
    )
}