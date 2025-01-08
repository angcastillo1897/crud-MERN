import { Button, Table, Input, Space } from "antd";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { PencilLine, Trash2 } from "lucide-react";
import { useFilterSearchColumns } from "../hooks/useFilterSearchColumns";
import { useState } from "react";
import { useDeleteUserMutation } from "../usersApiSlice";
import { EditUserModal } from "../components/EditUserModal";

const Dashboard1 = () => {
    const { isLoadingUsers , error , users,page, total,limit ,refetchUsersByQueryParams, getUsers } = useFetchUsers();
    const { getColumnSearchProps } = useFilterSearchColumns();
    const [sortedInfo, setSortedInfo] = useState({});
    const [fullNameSearch, setFullNameSearch] = useState('');
    const [deleteUser] =useDeleteUserMutation()
    /* MODAL EDIT USER */
    const [openUserModal, setOpenUserModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);


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
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Nombre completo',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: (a, b) => a.fullName.length - b.fullName.length,
            sortOrder: sortedInfo.columnKey === 'fullName' ? sortedInfo.order : null,
            ...getColumnSearchProps('fullName'),
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <div className="flex gap-2 flex-wrap">
                    <Button type="default" shape="circle" onClick={() => onOpenEditUserModal(record)}>
                        <PencilLine className="w-4 h-4" />
                    </Button>
                    <Button type="primary" danger shape="circle" onClick={() => onDeleteUser(record.id)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        }
    ];

    const onHandleTableChange = (pagination,filters,sorter) => {
        refetchUsersByQueryParams(pagination.current, pagination.pageSize);
        setSortedInfo(sorter)
    }

    const onClearSorters = () => {
        setSortedInfo({});
    }

    const onSearch = () => {
        refetchUsersByQueryParams(1, limit, fullNameSearch);
    }

    const onCleanSearch = () => {
        setFullNameSearch('');
        refetchUsersByQueryParams(1, limit, '');
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

    const onOpenEditUserModal = ({fullName,userType,...user_info}) => {
        setOpenUserModal(true);

        setUserToEdit(user_info);
    }

    const onCloseEditUserModal = () => {
        setOpenUserModal(false);
        setUserToEdit(null);
    }

    // if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error loading users</div>
    
    return (
        <>
            <div className="flex items-center mb-4 gap-4">
                <Space.Compact style={{ width: '400px' }}>
                    <Input placeholder="Buscar por nombre completo" onChange={(e) => setFullNameSearch(e.target.value)} value={fullNameSearch} />
                    <Button type="primary" onClick={onSearch}>Buscar</Button>
                    <Button type="secondary" className="bg-gray-700 hover:bg-gray-600 text-white" onClick={onCleanSearch}>Limpiar</Button>
                </Space.Compact>
                <Button onClick={onClearSorters}>Limpiar ordenamientos</Button>
            </div>
            <Table
            columns={columns}
            dataSource={users}
            loading={isLoadingUsers}
            rowKey="id"
            pagination={{current: page, pageSize: limit,total }}
            onChange={onHandleTableChange}
            />
            <EditUserModal userInfo={userToEdit} userId={userToEdit?.id} setClose={onCloseEditUserModal} open={openUserModal} />
        </>
    )
}

export default Dashboard1