import { Button, Form, Popconfirm, Table, Tag, Typography } from "antd";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { PencilLine, Trash2 } from "lucide-react";
import { useFilterSearchColumns } from "../hooks/useFilterSearchColumns";
import { useEffect, useState } from "react";
import { useDeleteUserMutation, useUpdateUserMutation } from "../usersApiSlice";
import { EditableCell} from "../components/EditableCell";
import { useDispatch } from "react-redux";
import { setUserById } from "../usersSlice";

const Dashboard2 = () => {
    const { isLoadingUsers , error , users,page, total,limit ,refetchUsersByQueryParams, getUsers } = useFetchUsers();
    const { getColumnSearchProps } = useFilterSearchColumns();
    const [sortedInfo, setSortedInfo] = useState({});
    const [deleteUser] =useDeleteUserMutation()
    /* Editing in line */
    const [data, setData] = useState(users);
    const [editingId, setEditingId] = useState('');
    const isEditing = (record) => record.id === editingId;
    const [form] = Form.useForm();

    const [updateUser] = useUpdateUserMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        setData(users);
    }, [users]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Usuario',
            dataIndex: 'userName',
            key: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            sortOrder: sortedInfo.columnKey === 'userName' ? sortedInfo.order : null,
            ...getColumnSearchProps('userName'),
            editable: true,
        },
        {
            title: 'Tipo de usuario',
            dataIndex: 'userType',
            key: 'userType',
            sorter: (a, b) => a.userType.length - b.userType.length,
            sortOrder: sortedInfo.columnKey === 'userType' ? sortedInfo.order : null,
            ...getColumnSearchProps('userType'),
            render: (userType) => {
                const color = userType === 'ADMIN' ? 'green' : 'blue';
                return <Tag color={color}>{userType}</Tag>;
            }
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => {
                const editable= isEditing(record)
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => onSaveEditInLine(record.id)} style={{ marginInlineEnd: 8 }}>
                            Guardar
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={onCancelEditInLine}>
                            <a>Cancelar</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <div className="flex gap-2 flex-wrap">
                        <Button type="default" shape="circle" onClick={() => onEditInLine(record)}>
                            <PencilLine className="w-4 h-4" />
                        </Button>
                        <Button type="primary" danger shape="circle" onClick={() => onDeleteUser(record.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                )
                
            
            }
        }
    ];

    const mergedColumns= columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onHandleTableChange = (pagination,filters,sorter) => {
        refetchUsersByQueryParams(pagination.current, pagination.pageSize);
        setSortedInfo(sorter)
        onCancelEditInLine()
    }

    /* ACTIONS OF USER, EDIT AND DELETE */
    const onDeleteUser = async (id) => {
        try {
            await deleteUser({id}).unwrap();
            getUsers();
        } catch (error) {
            console.log('error', error);
        }
    }

    const onEditInLine = (record) => {
        form.setFieldsValue({ userType: '', ...record });
        setEditingId(record.id);
    }

    const onSaveEditInLine = async (id) => {
        try {
            const row = (await form.validateFields());            
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);
            
            if (index > -1) {                
                const item = newData[index];
                console.log('item', item);
                const {id} = item;
                
                /* save in db */
                try {
                    const userDataUpdated = await updateUser({id:id,...row}).unwrap();
                    dispatch(setUserById(userDataUpdated));
                } catch (error) {
                    console.log('Validación fallida:', error);
                }
                setEditingId("");
            } 
            // else {
            //     console.log("ENTRO AUQI 2");
            //     newData.push(row);
            //     setData(newData);
            //     setEditingId("");
            // }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    }

    const onCancelEditInLine = () => {
        setEditingId('');
    };


    if (error) return <div>Error loading users</div>
    
    return (
        <>  
        <Form form={form} component={false}>
            <Table
            components={{
                body: { cell: EditableCell },
            }}
            columns={mergedColumns}
            dataSource={users}
            loading={isLoadingUsers}
            rowKey="id"
            pagination={{current: page, pageSize: limit,total }}
            rowClassName="editable-row"
            onChange={onHandleTableChange}
            />
        </Form>
        </>
    )
}
export default Dashboard2;