import { Badge, Input } from "@fluentui/react-components";
import "../styles/headerNavigationBar.scss";
import * as PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";
import { DismissRegular } from "@fluentui/react-icons";
import * as styles from "../styles/listInput.module.scss";

/** @type {React.FC<Omit<import("@fluentui/react-components").InputProps, 'value' | 'onChange'> & { value: string[], onChange: (ev?: React.ChangeEvent<HTMLInputElement>, data: { value: string[] }) => void }>} */
const ListInput = (props) => {

    const {
        value,
        onChange,
        ...inputProps
    } = props;

    const listValue = useMemo(() => [value || []].flat(), [value]);

    const [newValue, setNewValue] = useState(() => "");

    const onRemove = useCallback((item) => {
        onChange(undefined, { value: listValue.filter(v => v !== item) });
    }, [listValue, onChange])

    const add = useCallback((htmlInputElement) => {
        if (htmlInputElement.value) {
            onChange(undefined, { value: [...listValue, htmlInputElement.value].filter((item, index, arr) => arr.indexOf(item) === index) });
        }
        htmlInputElement.value = "";
        setNewValue("");
    }, [listValue, onChange]);

    return (
        <Input
            {...inputProps}
            value={newValue}
            onChange={(ev, data) => { setNewValue(data.value) }}
            onKeyDown={(ev) => {
                if (["Enter", "Tab"].includes(ev.key)) {
                    add(ev.target)
                }
                inputProps.onKeyDown?.(ev)
            }}
            onBlur={(ev) => {
                add(ev.target)
                inputProps.onKeyDown?.(ev)
            }}
            contentBefore={(
                <>
                    <div>
                        {listValue.map(t => (
                            <Badge key={t} appearance="outline" className={styles.ListInput_badge} >
                                {t}
                                <DismissRegular onClick={() => onRemove(t)}  className={styles.ListInput_close} />
                            </Badge>
                        ))}
                    </div>
                    {inputProps.contentBefore}
                </>
            )}
        ></Input>
    )
}
ListInput.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired
}
export default ListInput

