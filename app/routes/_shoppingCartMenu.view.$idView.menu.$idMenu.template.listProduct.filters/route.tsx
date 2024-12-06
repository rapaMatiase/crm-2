//REACT
import { useState } from "react";
//REMIX
import {
    Outlet,
    useLoaderData,
    useNavigate,
    useParams,
    useSearchParams
} from "@remix-run/react";
//TELERIK
import { Breadcrumb, GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import {
    Chip,
    ChipList,
    ChipListDataChangeEvent,
    ChipProps
} from "@progress/kendo-react-buttons";
import { Form, FormElement } from "@progress/kendo-react-form";
//UTIILS
import {
    objectToUrlSearchParams,
    urlSearchParamsToObject
} from "~/utils/URLSearchParams";
//API
import { getAtributosCMS } from "~/api/apiContentSettings";
//COMPONENTS
import { SingleSeleccion } from "~/components/fm-filters-components";


export const loader = async ({ request, params }) => {

    const { idView, idMenu } = params;

    const url = new URL(request.url);
    const urlBreadcrumb = JSON.parse(url.searchParams.get("breadcrumb") || "[]")
    const urlChipts = JSON.parse(url.searchParams.get("chipts") || "[]")
    const urlMenu = JSON.parse(url.searchParams.get("menu") || "[]")
    const urlFilters = JSON.parse(url.searchParams.get("filters") || "[]")

    const response = await getAtributosCMS({
        request,
        idView,
        idMenu,
        arrayFilterJson: JSON.stringify([{ key: "", value: "" }])
    });

    const filtersData = response.map((item: any) => {
        return {
            filterName: item.nombre,
            action: item.accion,
            data: item.opciones.map((opcion: any) => {
                return {
                    label: opcion.texto,
                    value: { [item.nombre]: { label: opcion.texto, id: opcion.id, menu: false } },
                    // url: { [item.nombre]: { label: opcion.texto, id: opcion.id, menu: false } }
                }
            })
        }
    });

    return { filtersData, urlBreadcrumb, urlChipts, urlMenu, urlFilters }

}

const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const ChiptFilter = (props) => {
    const truncatedText = truncateText(props.text, 30);
    return (
        <Chip {...props} removable={true} >
            {truncatedText}
        </Chip>
    )
}

export default function Chipts() {
    const { idView, idMenu } = useParams();
    const { filtersData, urlBreadcrumb, urlChipts, urlMenu, urlFilters } = useLoaderData();
    const [filters, setFilters] = useState(urlFilters);

    const navigate = useNavigate();

    const handleDataChange = (event: ChipListDataChangeEvent) => {
        const newChips = event.value;
        const newFilter = newChips.reduce((acc: any, chip: any) => {
            acc[chip.label] = { label: chip.label, id: chip.value, menu: false };
            return acc;
        }, {});
        const objectUrl = objectToUrlSearchParams({ menu: urlMenu, breadcrumb: urlBreadcrumb, filters: newFilter, chipts: newChips });
        navigate(`/view/${idView}/menu/${idMenu}/template/listProduct/filters/products?${objectUrl.toString()}`);
    };


    const handleChangeFilter = (event: any) => {
        const dataOption = event.value;

        const newFilter = { ...urlFilters, ...dataOption }
        setFilters(newFilter);
        const newChips = [...Object.keys(newFilter).map(key => ({
            label: newFilter[key].label,
            value: newFilter[key].id
        }))]

        const objectUrl = objectToUrlSearchParams({ menu: urlMenu, breadcrumb: urlBreadcrumb, filters: newFilter, chipts: newChips });

        navigate(`/view/${idView}/menu/${idMenu}/template/listProduct/filters/products?${objectUrl.toString()}`);
    }

    return (
        <>
            <GridLayout
                style={{ placeContent: "center" }}
                className="colorRojo"
                gap={{ rows: 10, cols: 10 }}
                rows={[{ height: 50 }, { height: 150 }, { height: 650 }]}
                cols={[{ width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }]}
            >



                <GridLayoutItem row={1} col={1} colSpan={10}  >
                    <Breadcrumb
                        data={urlBreadcrumb}
                        
                        // onItemSelect={handleItemSelect}
                        textField="label"
                    />
                </GridLayoutItem>
                <GridLayoutItem row={2} col={1} colSpan={3}>
                    <ChipList
                        data={urlChipts}
                        selection="multiple"
                        textField="label"
                        className="tags"
                        id="tags"
                        chip={ChiptFilter}
                        onDataChange={handleDataChange}
                    //chip={(props: ChipProps) => <Chip removable={true} {...props} />}
                    />
                </GridLayoutItem>
                <GridLayoutItem row={3} col={1} colSpan={3} rowSpan={6} >
                    <Form
                        render={() => (
                            <FormElement>
                                {filtersData.map((item: any, index: number) => (
                                    <>
                                        <SingleSeleccion
                                            key={`${index}-${item.id}`}
                                            handleChange={handleChangeFilter}
                                            item={item}
                                            className="filtros"
                                            filters={filters}
                                        />
                                    </>
                                ))}
                            </FormElement>
                        )}
                    />
                </GridLayoutItem>
                <Outlet />
            </GridLayout>
        </>
    )
}