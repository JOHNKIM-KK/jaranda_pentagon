import React, { useState, useEffect } from 'react';
import menuTheme from 'styles/menuTheme';
import PropTypes from 'prop-types';

import { PrivateRoute } from 'routes';
import { menuRouteMapping } from 'utils';
import { getAllRoles } from 'api/role';
import { storage } from 'utils';
import NotFound from 'pages/NotFound';

/* eslint-disable */

const { Container, Contents, Main, LogoImg } = menuTheme;

const Parent = ({ location, match }) => {
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    const userRole = storage.get('userInfo');

    const fetchData = async () => {
      const res = await getAllRoles();
      if (res) {
        setMenus(...res.filter((data) => data.id === userRole.role));
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      {match.isExact && (
        <Contents>
          <Main>부모님 메인</Main>
          <LogoImg src='/image/jaranda.image.jpeg' alt='자란다이미지' />
        </Contents>
      )}
      {menus && menus.menu.map(({ route }) => <PrivateRoute key={route} path={`/parent/${route}`} component={menuRouteMapping[route]} />)}
      {menus && menus.menu.filter(({ route }) => `/parent/${route}` !== location.pathname).length === menus.menu.length && !match.isExact && <NotFound />}
    </Container>
  );
};

Parent.propTypes = {
  match: PropTypes.object,
};

export default Parent;
