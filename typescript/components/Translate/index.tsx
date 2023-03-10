import React from 'react';
import { Trans } from 'react-i18next';

interface ITranslate {
	value: string;
	defaultValue?: string;
}

const Translate = (props: ITranslate) => {
	const { value, defaultValue } = props;

	return <Trans i18nKey={value}> {defaultValue ? defaultValue : value}  </Trans>;
};

export default Translate;
