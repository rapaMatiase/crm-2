import { Outlet, useNavigate, useParams, useSearchParams } from "@remix-run/react";
import { GridLayoutItem } from '@progress/kendo-react-layout';
import { objectToUrlSearchParams, urlSearchParamsToObject } from "~/utils/URLSearchParams";
import { useState } from "react";
import { Chip, ChipList, ChipListDataChangeEvent, ChipProps } from "@progress/kendo-react-buttons";

export default function Chipts() {
    const {idVista, idMenu} = useParams();

    const [url] = useSearchParams();
    const [object, setObject] = useState(urlSearchParamsToObject(url));
    const { menu, breadcrumb, filters, chipts } = urlSearchParamsToObject(url);
    const navigate = useNavigate();

    const handleDataChange = (event: ChipListDataChangeEvent) => {
        const newChips = event.value;
        const newFilter = newChips.reduce((acc: any, chip: any) => {
            acc[chip.label] = { label: chip.label, id: chip.value, menu: false };
            return acc;
        }, {});
        const objectUrl = objectToUrlSearchParams({menu, breadcrumb, filters : newFilter, chipts: newChips});
       
        navigate(`/templateBasic/vista/${idVista}/menu/${idMenu}/breadcrumb/chipts/filters/products?${objectUrl.toString()}`);
    };

    return (
        <>
            <GridLayoutItem row={2} col={1} colSpan={3}>
                <ChipList
                    data={chipts}
                    selection="multiple"
                    textField="label"
                    onDataChange={handleDataChange}
                    chip={(props: ChipProps) => <Chip removable={true} {...props} />}
                />
            </GridLayoutItem>
            <Outlet />
        </>
    )
}