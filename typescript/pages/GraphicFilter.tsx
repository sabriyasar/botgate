import React, { Component } from 'react';
import { Button, SelectBox } from 'devextreme-react';
import { IGraphFilterProps } from '../model/IGraphFilterModel';
import TranslateHelper from '../../../base/helpers/TranslateHelper';
import { LoadPanel } from 'devextreme-react/load-panel';
import GraphicContent from './GraphicContent';
import GraphicPopup from './GraphicPopup';

const navigatAlarmsIcons = (oldUnit: any, key: string) => {
	window.open(`/settings/alarm-management/add?id=${oldUnit.unitId}&widgetName=${key}`);
};

export const BlankNavigate = {
	navigatAlarmsIcons
};

export enum WidgetShowType {
	LIST = 'LIST',
	CARD = 'CARD'
}

export default class GraphicFilter extends Component<IGraphFilterProps, any> {

	constructor(props: IGraphFilterProps) {
		super(props);
		this.state = {
			treeBoxValue: [],
			newArray: [],
			oldUnit: null,
			newUnit: null,
			vehicleGraphics: '',
			unitIdC: '',
			loadPanelVisible: false,
			showIndicator: true,
			shading: true,
			showPane: true,
			closeOnOutsideClick: false,
			widgetDataType: null
		};

		const {customerId, GetFilterOptions, getUnits} = props;
		GetFilterOptions(customerId, getUnits ? getUnits : false);

		this.onChangeValues = this.onChangeValues.bind(this);

		this.onClick = this.onClick.bind(this);
		this.hideLoadPanel = this.hideLoadPanel.bind(this);
		this.onShowIndicatorChange = this.onShowIndicatorChange.bind(this);
		this.onShadingChange = this.onShadingChange.bind(this);
		this.onShowPaneChange = this.onShowPaneChange.bind(this);
		this.onCloseOnOutsideClickChange = this.onCloseOnOutsideClickChange.bind(this);
	}
	componentDidMount() {
		setTimeout(this.ChooseVehicle, 1000);
		this.props.getWidgetList();
	}

	componentWillUnmount() {
		this.setState = () => {
			return;
		};
	}

	ChooseVehicle = () => {
		const {units} = this.props;
		const url = new URL(window.location.href);
		const vehicleGraphics = url.searchParams.get('id');

		if (vehicleGraphics !== '') {
			const newUnit = units.find(unit => unit.identifier === vehicleGraphics);
			this.setState({newUnit: newUnit});
			this.getWidget();
		}
	}
	getWidget = () => {
		const {newUnit} = this.state;
		newUnit && this.setState({widgetDataType: WidgetShowType.CARD});
	}
	getList = () => {
		const {newUnit} = this.state;
		newUnit && this.setState({widgetDataType: WidgetShowType.LIST});
	}

	componentDidUpdate(prevProps: Readonly<any>) {
		const {customerId, GetFilterOptions, getUnits} = this.props;
		if (prevProps.customerId !== customerId) {
			GetFilterOptions(customerId, getUnits ? getUnits : false);
		}
	}

	onChangeValues = (e: any, key: string) => {
		const selectedItem = e.selectedItem;
		if (selectedItem) {
			this.props.onChangeValue({key, value: selectedItem.identifier});
			this.setState({unitIdC: selectedItem.identifier, newUnit: selectedItem, oldUnit: selectedItem});
		}
	}

	onClick() {
		this.setState({
			loadPanelVisible: true
		}, () => {
			setTimeout(this.hideLoadPanel, 500);
		});
	}

	hideLoadPanel() {
		this.setState({
			loadPanelVisible: false
		});
	}

	onShowIndicatorChange(e: any) {
		this.setState({
			showIndicator: e.value
		});
	}

	onShadingChange(e: any) {
		this.setState({
			shading: e.value
		});
	}

	onShowPaneChange(e: any) {
		this.setState({
			showPane: e.value
		});
	}

	onCloseOnOutsideClickChange(e: any) {
		this.setState({
			closeOnOutsideClick: e.value
		});
	}

	handleClick = () => {
		this.forceUpdate();
	}

	showGraphicPopup = (key: string) => {
		this.setState({
			popupVisible: true,
			field: key
		});
	}

	hideGraphicPopup = () => {
		this.setState({ popupVisible: false, field: null});
	}

	render() {
		const { units, widgetList, dateType } = this.props;
		const {oldUnit, widgetDataType, popupVisible, field } = this.state;
		const url = new URL(window.location.href);
		const vehicleGraphics = url.searchParams.get('id');
		return (
			<div>
				<GraphicPopup
					oldUnit={oldUnit}
					popupVisible={popupVisible}
					hiddenInfo={this.hideGraphicPopup}
					dateType={dateType}
					field={field}
				/>
				<div className="graphic-filter">
					<div className="form-row">
						<div className="form-group">
							<SelectBox
								items={units}
								displayExpr={'identifier'}
								valueExpr={'identifier'}
								searchExpr={['identifier', 'chassisNo']}
								placeholder={TranslateHelper.Translate('00664')}
								onSelectionChanged={(e: any) => this.onChangeValues(e, 'unitsValue')}
								searchEnabled={true}
								defaultValue={vehicleGraphics}
							/>
						</div>
						<div className="report-buttons">
							<Button
								type="default"
								onClick={() => {
									this.getList();
									this.onClick();
									this.handleClick();
								}}
							>
								{TranslateHelper.Translate('00696')}
							</Button>

							<Button
								type="default"
								onClick={() => {
									this.getWidget();
									this.onClick();
									this.handleClick();
								}}
							>
								{TranslateHelper.Translate('00665')}
							</Button>
							<LoadPanel
								shadingColor="rgba(0,0,0,0.4)"
								onHiding={this.hideLoadPanel}
								visible={this.state.loadPanelVisible}
								showIndicator={this.state.showIndicator}
								shading={this.state.shading}
								showPane={this.state.showPane}
								closeOnOutsideClick={this.state.closeOnOutsideClick}
							/>
						</div>
					</div>
				</div>
				<GraphicContent
					unit={oldUnit}
					widgetDataType={widgetDataType}
					widgetList={widgetList}
					dateType={dateType}
					showGraphicPopup={this.showGraphicPopup}
				/>
			</div>
		);
	}
}
