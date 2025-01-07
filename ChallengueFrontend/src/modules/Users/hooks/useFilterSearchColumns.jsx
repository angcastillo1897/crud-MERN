import { Button, Input, Space } from "antd";
import { Search } from "lucide-react";
import { useRef } from "react";

export const useFilterSearchColumns = () => {
    const filterColumnsKeysMap={
        "fullName": "nombre completo",
        "email": "correo",   
        "userName": "usuario",
        "userType": "tipo de usuario"
    }

    const searchInput = useRef(null);

    const onHandleSearch = (
        selectedKeys,
        confirm,
    ) => {
        confirm();
    };

    const onHandleReset = (clearFilters, confirm) => {
        clearFilters()
        confirm();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Buscar ${filterColumnsKeysMap[dataIndex]}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => onHandleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => onHandleSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Buscar
                    </Button>
                    <Button
                        onClick={() => clearFilters && onHandleReset(clearFilters, confirm)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reiniciar
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Cerrar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <Search className={`w-4 h-4' ${filtered ? 'text-light-blue-500' : ' text-gray-500'} `} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value).toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
    });

    return { getColumnSearchProps };
}
