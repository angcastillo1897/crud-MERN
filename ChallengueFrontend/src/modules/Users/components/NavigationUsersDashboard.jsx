import { Menu } from 'antd';
import { UsersIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { setPagination } from '../usersSlice';

export const  NavigationUsersDashboard=({ userType }) => {
    const location = useLocation();
    const current = location.pathname.split('/').pop();
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const getInitialDashboardList = (userType) => {
        const list = [{
            key: 'dashboard_1',
            icon: <UsersIcon className="h-4 w-4" />,
            label: 'Vista de usuarios 1',
        }];
        if (userType === 'ADMIN') {
            list.push({
                key: 'dashboard_2',
                icon: <UsersIcon className="h-4 w-4" />,
                label: 'Vista de usuarios 2',
            });
        }
        return list;
    };

    const [dashboardList, setDashboardList] = useState(getInitialDashboardList(userType));

    useEffect(() => {
        setDashboardList(getInitialDashboardList(userType));
    }, [userType]);

    const onChangePage = (key) => {
        dispatch(setPagination({ page: 1, limit: 10 }));
        navigate(key);
    };


    return (
        <Menu
        mode="horizontal"
        selectedKeys={[current]}
        items={dashboardList}
        onClick={({ key }) => onChangePage(key)}
        className="mb-6"
        />
    );
}

NavigationUsersDashboard.propTypes = {
    userType: PropTypes.string.isRequired,
};





