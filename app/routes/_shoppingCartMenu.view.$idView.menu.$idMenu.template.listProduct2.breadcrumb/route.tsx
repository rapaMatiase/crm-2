//TELERIK
import {  GridLayoutItem } from '@progress/kendo-react-layout';
import { Outlet, useNavigate, useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Breadcrumb } from '@progress/kendo-react-layout';

export default function breadcumb() {

    const [url] = useSearchParams();

    const [selectedValue, setSelectedValue] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedValue = JSON.parse(url.get('filters') || '[]') || [];
        if (selectedValue.length === 0) {
            setSelectedValue([]);
        } else {
            const justMenu =  selectedValue.filter((item: any) => item.tipo === 'menu');
            const formatForBreadcrumb = justMenu.map((item: any, index : Number) => { return { id : index, text : item.nombre } });
            setSelectedValue(formatForBreadcrumb);
        }
    }, [url]);


    return (
        <>
            <GridLayoutItem  row={1} col={1} colSpan={10} className="cms-body-grid_breadcrumb">
                <Breadcrumb
                    data={selectedValue}
                    className='cms-body_breadcrumb'
                />
            </GridLayoutItem>
            <Outlet />
        </>
    )
}