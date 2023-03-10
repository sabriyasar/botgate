import React, { Component } from 'react';
import { Button, Chart, DateBox, Popup, SelectBox } from 'devextreme-react';
import TranslateHelper from '../../../base/helpers/TranslateHelper';
import { graphicType, TimeSpacing } from './WidgetData';
import { IOption } from '../../../base/models/IBaseTypes';
import {
	ArgumentAxis,
	CommonSeriesSettings,
	Format,
	Grid,
	Legend, Point,
	Series,
	Size,
	Tooltip,
	ValueAxis
} from 'devextreme-react/chart';
import { format, startOfDay } from 'date-fns';
import { GetAuthInfoByKey } from '../../../modules/Auth/helper/AuthHelper';
import Axios from 'axios';
import AppConfig from '../../../../environment/app';

interface IGraphicPopupProps {
	oldUnit: any;
	popupVisible: boolean;
	dateType: 'date' | 'datetime';
	field: string;
	hiddenInfo: () => void;
}

interface IGraphicPopupState {
	startDate: string | Date;
	endDate: string | Date;
	type: any | null;
	avgList: any;
	showChart: boolean;
}

export default class GraphicPopup extends Component<IGraphicPopupProps, IGraphicPopupState> {

	constructor(props: IGraphicPopupProps) {
		super(props);

		this.state = {
			startDate: startOfDay(new Date()).toDateString(),
			endDate: new Date().toDateString(),
			type: null,
			avgList: null,
			showChart: false
		};

	}

	componentWillUnmount() {
		this.resetPopup();
	}

	resetPopup = () => {
		this.setState({
			startDate: startOfDay(new Date()).toDateString(),
			endDate: new Date().toDateString(),
			type: null,
			avgList: null,
			showChart: false
		});
	}
	getGraph = () => {
		const {startDate, endDate} = this.state;
		const {oldUnit, field} = this.props;

		const firstDate = format(new Date(startDate), 'yyyy/MM/dd HH:mm:ss');
		const lastDate = format(new Date(endDate), 'yyyy/MM/dd HH:mm:ss');
		const token: any = GetAuthInfoByKey('token');
		Axios.get(`${AppConfig.ApiUrl}api/v1/canbuslog/avg?field=${field}&firstDate=${firstDate}&lastDate=${lastDate}&unitId=${oldUnit.unitId}`
			, {
				headers: {
					'Authorization': token
				}
			}).then((res) => {
			const fieldAvg = res.data;
			this.setState({avgList: fieldAvg});
		}).catch((err) => {
			return console.log(err);
		});
		this.setState({showChart: true});
	}

	onValueChange(e: any, key: string) {
		if (key === 'startDate') {
			const startDate = format(new Date(e.value), 'yyyy/MM/dd HH:mm:ss');
			this.setState({startDate: startDate});

		}
		if (key === 'endDate') {
			const endDate = format(new Date(e.value), 'yyyy/MM/dd HH:mm:ss');
			this.setState({endDate: endDate});
		}
		if (key === 'typeDate') {
			const val = e.value;
			const {endDate, startDate} = this.state;
			startOfDay(new Date(startDate));
			const strtDate = format(((new Date(new Date(endDate).setDate((new Date(endDate).getDate()) - val)))), 'yyyy/MM/dd HH:mm:ss');
			this.setState({startDate: strtDate});
		}
		if (key === 'type') {
			this.setState({type: e.selectedItem});
		}
	}

	getChart() {
		const {avgList, type} = this.state;
		const chartType = type?.name;

		const aList = (avgList ? (avgList.length === 0 ? {x: 0, y: 0} :
				(avgList?.map((value: any) => ({
					x: new Date(value[0]).toLocaleDateString(),
					y: (value[1] !== null ? Number(value[1].toFixed(2)) : value[1])
				}))))
			: {x: 0, y: 0});

		if (chartType === 'Bar') {
			return <Chart dataSource={aList}>
					<Legend visible={false} />
					<Series
						type="Bar"
						color="gray"
						name={' '}
						argumentField="x"
						valueField="y"
					/>
					<Format
						type="largeNumber"
					/>
					<Size
						width={'100%'}
						height={400} />
					<Tooltip enabled={true}
									 zIndex={999999}
					/>
				</Chart>;
		} else if (chartType === 'Çizgi') {
			return <Chart palette="Pastel" dataSource={aList}>
				<Series
					argumentField="x"
					valueField="y"
					type="line"
				/>
				<ValueAxis type="y"
				>
					<Grid visible={true} />
				</ValueAxis>
				<ArgumentAxis
					valueMarginsEnabled={false}
				>
					<Grid visible={true} />
				</ArgumentAxis>
				<Legend
					visible={false}
				/>
				<Size
					width={'100%'}
					height={400} />
				<Tooltip enabled={true}
								 zIndex={999999}
				/>
			</Chart>;
		} else if (chartType === 'Nokta') {
			return <Chart
				id="chart"
				dataSource={aList}
			>
				<ArgumentAxis>
					<Grid visible={true} />
				</ArgumentAxis>
				<CommonSeriesSettings
				/>
				<Series
					argumentField="x"
					valueField="y"
					name={' '}
					type="scatter"

				>
					<Point size={10} />
				</Series>
				<Tooltip enabled={true}
								 zIndex={999999}
				/>
				<ValueAxis
					name="y"
					position="left"
					showZero={false} />
				<Legend visible={false} />
				<Size
					width={'100%'}
					height={400} />
			</Chart>;
		}

		return <></>;
	}

	render() {
		const {oldUnit, popupVisible, dateType, hiddenInfo} = this.props;
		const {startDate, endDate, showChart, type} = this.state;
		const lastDate = ((endDate !== new Date() ? new Date(endDate).getDate() + new Date().getTime() : endDate));

		return <Popup
			title={(oldUnit && oldUnit.identifier) + ' / ' + (oldUnit && oldUnit.chassisNo)}
			visible={popupVisible}
			onHiding={() => {
				this.resetPopup();
				hiddenInfo();
			}}
			dragEnabled={false}
			closeOnOutsideClick={true}
			showCloseButton={true}
			showTitle={true}
		>
			<div className="graphic-filter">
				<div className="form-row">

					<div className="form-group">
						<label>{TranslateHelper.Translate('00466')}</label>
						<SelectBox
							items={TimeSpacing.map((item: IOption) => ({
								name: TranslateHelper.Translate(item.name),
								value: item.value
							}))}
							displayExpr="name"
							valueExpr="value"
							onValueChanged={(e: any) => this.onValueChange(e, 'typeDate')}
						/>
					</div>
					<div className="form-group">

						<label>{TranslateHelper.Translate('00267')}</label>
						<DateBox
							type={dateType}
							value={startDate}
							onValueChanged={(e: any) => this.onValueChange(e, 'startDate')}
						/>

					</div>

					<div className="form-group">

						<label>{TranslateHelper.Translate('00268')}</label>
						<DateBox
							type={dateType}
							value={lastDate}
							onValueChanged={(e: any) => this.onValueChange(e, 'endDate')}
						/>

					</div>
				</div>
				<div className="form-row">
					<div className="form-group">

						<label>{TranslateHelper.Translate('00715')}</label>
						<SelectBox
							dataSource={graphicType}
							displayExpr="name"
							valueExpr="id"
							defaultValue="name"
							onSelectionChanged={(e: any) => this.onValueChange(e, 'type')}
							value={type?.id}
						/>
					</div>

					<div className="form-group">
						<div className="popup-buttons">
							<Button
								type="default"
								onClick={() => this.getGraph()}
							>
								{TranslateHelper.Translate('00716')}
							</Button>
						</div>
					</div>

				</div>

			</div>
			<div className="form-row">
				<div className="form-chart">
					{
						showChart && this.getChart()
					}
				</div>
			</div>

		</Popup>;
	}
}
