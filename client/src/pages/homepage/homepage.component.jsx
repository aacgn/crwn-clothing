import React from 'react';

import { HomePageContainer } from './homepage.styles';

import Directory from '../../components/directory/directory.component';

export default function HomePage() {

    return (
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
    );

}