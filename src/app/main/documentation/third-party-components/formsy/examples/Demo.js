import React from "react";

import Formsy from 'formsy-react';

import {
    TextFieldFormsy
} from '@fuse/core/formsy';

import Button from '@material-ui/core/Button';

export default props => {
    return (
        <Formsy
            onValidSubmit={async (data) => {

                const response = await fetch("https://kapi-marcas.badillosoft.now.sh/api/marcas/new", {
                    method: "POST",
                    headers: {
                        // "Content-Type": "x-www-form-urlencoded"
                        "Content-Type": "application/json"
                    },
                    mode: "cors",
                    body: JSON.stringify({ 
                        id: `marc${Math.random().toString().slice(2)}`, 
                        ...data 
                    })
                });

                if (!response.ok) {
                    const error = await response.text();
                    console.warn(error);
                    return;
                }

                const json = await response.json();

                console.log(json);
            }}
            // onValid={enableButton}
            // onInvalid={disableButton}
            // ref={formRef}
            className="flex flex-col justify-center"
        >
            <TextFieldFormsy
                className="mb-16"
                type="text"
                name="marca"
                label="Marca"
                // validations={{
                //     minLength: 4,
                // }}
                // validationErrors={{
                //     minLength: 'Min character length is 4',
                // }}
                variant="outlined"
                required
            />
            <TextFieldFormsy
                className="mb-16"
                type="text"
                name="descrip"
                label="Descripción"
                // validations={{
                //     minLength: 4,
                // }}
                // validationErrors={{
                //     minLength: 'Min character length is 4',
                // }}
                variant="outlined"
                required
            />
            <TextFieldFormsy
                className="mb-16"
                type="text"
                name="usuario"
                label="Usuario"
                // validations={{
                //     minLength: 4,
                // }}
                // validationErrors={{
                //     minLength: 'Min character length is 4',
                // }}
                variant="outlined"
                required
            />
            <TextFieldFormsy
                className="mb-16"
                type="date"
                name="usufecha"
                label="Usuario Fecha"
                // validations={{
                //     minLength: 4,
                // }}
                // validationErrors={{
                //     minLength: 'Min character length is 4',
                // }}
                variant="outlined"
                required
            />
            <TextFieldFormsy
                className="mb-16"
                type="text"
                name="usuhora"
                label="Usuario Hora"
                // validations={{
                //     minLength: 4,
                // }}
                // validationErrors={{
                //     minLength: 'Min character length is 4',
                // }}
                variant="outlined"
                required
            />
            <TextFieldFormsy
                className="mb-16"
                type="number"
                name="numero"
                label="Número"
                // validations={{
                //     minLength: 4,
                // }}
                // validationErrors={{
                //     minLength: 'Min character length is 4',
                // }}
                variant="outlined"
                required
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mx-auto mt-32 mb-80"
                aria-label="LOG IN"
                // disabled={!isFormValid}
            >
                Can submit
                </Button>
        </Formsy>
    )
};