import { Form, Input, InputNumber } from "antd";
import PropTypes from "prop-types";

export const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
    }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
        {editing ? (
            <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
                {
                required: true,
                message: `Please Input ${title}!`,
                },
            ]}
            >
            {inputNode}
            </Form.Item>
        ) : (
            children
        )}
        </td>
    );
};

EditableCell.propTypes = {
    editing: PropTypes.bool,
    dataIndex: PropTypes.string,
    title: PropTypes.any,
    inputType: PropTypes.oneOf(['number', 'text']),
    record: PropTypes.object,
    index: PropTypes.number,
    children: PropTypes.node,
};