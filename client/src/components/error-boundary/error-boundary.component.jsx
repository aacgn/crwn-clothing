import React from 'react';

import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from './error-boundary.styles';

export default class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            hasErrored: false
        }
    }

    static getDerivedStateFromError(error) {
        // process the error
        return { hasErrored: true }
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png'/>
                    <ErrorImageText>Sorry this page page is broken</ErrorImageText>
                </ErrorImageOverlay>
            );
        }

        return this.props.children;
    }
};