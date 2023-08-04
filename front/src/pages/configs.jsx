import { useCallback, useEffect, useState } from "react";
import { Button, Field, Spinner } from "@fluentui/react-components";
import { Alert } from "@fluentui/react-components/unstable";
import { api } from "../services/api";
import ListInput from "../components/listInput";

import * as styles from "../styles/pages.configs.module.scss";

const Configs = () => {

    /** @type {ReturnType<typeof useState<{ domains: string[], tenants: string[] }>>} */
    const [configs, setConfigs] = useState();

    /** @type {ReturnType<typeof useState<{ domains: string[], tenants: string[] }>>} */
    const [error, setError] = useState();

    useEffect(() => {
        api.get('/api/configs')
            .then(({ data }) => setConfigs(data))
            .catch(e => setError(e))
    }, []);

    const save = useCallback(() => {
        setConfigs(finalValue => {
            api
                .post('/api/configs', finalValue)
                .then((response) => {
                    console.log({ finalValue, response })
                    setConfigs(finalValue);
                })
                .catch(e => setError(e))
            return undefined;
        })
    }, []);

    return (
        <div className={styles.container}>
            <h1>Configs</h1>
            {error !== undefined && (
                <Alert intent="error" action="Retry">
                    Error text
                </Alert>
            )}
            {configs === undefined ? (
                (error === undefined && <Spinner size="extra-large" />)
            ) : (
                <div>
                    <Field label="Tenants">
                        <ListInput
                            value={configs.tenants}
                            onChange={(ev, data) => setConfigs((c) => ({ ...c, tenants: data.value }))}
                        />
                    </Field>
                    <br />
                    <Field label="Domínios">
                        <ListInput
                            value={configs.domains}
                            onChange={(ev, data) => setConfigs((c) => ({ ...c, domains: data.value }))}
                        />
                    </Field>
                    <br />
                    <Button appearance="primary" onClick={save}>
                        Salvar
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Configs
