//REACT
import { useEffect, useState } from 'react';
//REMIX
import { Outlet, useNavigate, useSearchParams } from '@remix-run/react';
//TELERIK
import { Chip, ChipList, ChipProps  } from '@progress/kendo-react-buttons';
import { GridLayoutItem } from '@progress/kendo-react-layout';


const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const ChiptFilter = (props : ChipProps ) => {
    const truncatedText = truncateText(props.text, 30);
    return (
        <Chip {...props} removable={true} className="cms-body_chiplist-chip" >
            {truncatedText}
        </Chip>
    )
}

export default function ChiptsList() {

    const [url] = useSearchParams();
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const seleted = JSON.parse(url.get('filters') || '[]') || [];
        const justChipt =  seleted.filter((item) => item.tipo === 'filtro');
        setList((justChipt));
    }, [url]);

    const handleDataChange = (event: any) => {
        const dataOption = event.value;
        setList(dataOption);
        navigate({
            pathname: `/view/8/menu/1/template/listProduct2/breadcrumb/chiplist/filters/products`,
            search: `?filters=${JSON.stringify(dataOption).toString()}`
        })
    }

    return (
        <>
            <GridLayoutItem row={2} col={1} colSpan={3} className="cms-body-grid_chiplist cms-body_chiplist">
                <ChipList
                    data={list}
                    selection='single'
                    textField='texto'
                    chip={ChiptFilter}
                    onDataChange={handleDataChange}
                    className='cms-body_chip'
                />
            </GridLayoutItem>
            <Outlet />
        </>
    )
}