
export const BackOfficeErrorAlert = ({ error }) => {
    console.log(error);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div style={{ border: '1px solid red', padding: '20px', borderRadius: '5px', backgroundColor: '#ffe6e6' }}>
                <h2 style={{ color: 'red' }}>Detalle del error</h2>
                <p><strong>Process:</strong> {error.process}</p>
                <p><strong>Route:</strong> {error.route}</p>
                <p><strong>Date:</strong> {error.timestamp}</p>
                <p><strong>Details:</strong> </p>
                <pre>
                    {`Status: ${error.response.status}\nStatusError: ${error.response.statusText} \nBody: ${error.response.body}`}
                </pre>
            </div>
        </div>
    )
}


export const BackOfficeUnExpectErrorAlert = ({ error }) => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ border: '1px solid red', padding: '20px', borderRadius: '5px', backgroundColor: '#ffe6e6' }}>
            <h2 style={{ color: 'red' }}>Detalle del error </h2>
            <p><strong>Process:</strong> {error.process}</p>
            <p><strong>Route:</strong> {error.route}</p>
            <p><strong>Date:</strong> {error.timestamp}</p>
            <p><strong>Details:</strong> </p>
            <pre>
                Ocurrio un error inesperado.
            </pre>
        </div>
    </div>
}