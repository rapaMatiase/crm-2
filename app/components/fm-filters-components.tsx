//REMIX
import { useNavigate } from "@remix-run/react";
//TELERIK
import { FieldWrapper  } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { RadioGroup } from '@progress/kendo-react-inputs';

export const SingleSeleccion = (props : any) => {
    const {item, handleChange, filters } = props;

    const findLabelIndex = (data: any[], label: string) => {
        return data.findIndex(item => item.label === label);
    };

    const indexSeleccionado = filters.hasOwnProperty(item.filterName) 
        ? findLabelIndex(item.data, filters[item.filterName].label) 
        : 0;

    return (
        <FieldWrapper>
            <Label>{item.filterName}</Label>
            { filters.hasOwnProperty(item.filterName) === true ?
            <RadioGroup 
                data={item.data} 
                defaultValue={item.data[indexSeleccionado].value} 
                onChange={(event)=>handleChange(event)} 
                />
            :
            <RadioGroup 
                data={item.data} 
                onChange={(event)=>handleChange(event)} 
                defaultValue={null}
                />
            }
        </FieldWrapper>
    );
}

