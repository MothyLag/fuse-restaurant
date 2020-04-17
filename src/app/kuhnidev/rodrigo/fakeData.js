const api_kitelementos = 'https://kapi-kitelementos.now.sh/';
export const data = {
	fields: {
		id: {
			type: 'id',
			required: true
		},
		zona: {
			type: 'string',
			required: false
		},
		descrip: {
			type: 'string',
			required: true,
			search: 'or'
		},
		usuario: {
			type: 'string',
			required: true,
			search: 'or'
		},
		usufecha: {
			type: 'date',
			required: true,
			search: 'and'
		},
		usuhora: {
			type: 'string',
			required: true,
			search: 'or'
		}
	}
};
export const kit = {
	component: {
		api: api_kitelementos,
		catalogo: 'kitelementos',
		attrs: {
			_id: true,
			articulo: true,
			componente: true,
			cantidad: true,
			almacen: true,
			observ: true,
			idpartida: true,
			usuario: true,
			usufecha: true,
			usuhora: true
		},
		inputs: [
			{
				name: '_id',
				disabled: true,
				type: 'text',
				required: true,
				regex: '[A-Za-z0-9 \\s]{0,}'
			},
			{
				name: 'articulo',
				disabled: false,
				type: 'text',
				required: true,
				regex: '[A-Za-z0-9 \\s]{0,}'
			},
			{
				name: 'cantidad',
				disabled: false,
				type: 'number',
				required: true,
				regex: '[A-Za-z0-9 \\s]{0,}'
			},
			{
				name: 'almacen',
				disabled: false,
				type: 'text',
				required: true,
				regex: '[A-Za-z0-9 \\s]{0,}'
			},
			{
				name: 'observ',
				disabled: false,
				type: 'text',
				required: true,
				regex: '[A-Za-z0-9 \\s]{0,}'
			},
			{
				name: 'idpartida',
				disabled: false,
				type: 'number',
				required: true,
				regex: '[A-Za-z0-9 \\s]{0,}'
			},
			{
				name: 'usuario',
				disabled: false,
				type: 'text',
				required: true,
				regex: '[A-Za-z0-9 \\s]{0,}'
			},
			{
				name: 'diasrevision',
				disabled: false,
				type: 'select',
				required: true,
				options: [{ dia: 'Lunes' }, { dia: 'Martes' }, { dia: 'Jueves' }, { dia: 'Viernes' }],
				regex: '[A-Za-z0-9 \\s]{0,}',
				label: 'dia'
			}
			// {
			//   name: "usufecha",
			//   disabled: false,
			//   type: "text",
			//   required: true,
			//   regex: "[A-Za-z0-9 \\s]{0,}",
			// },
			// {
			//   name: "usuhora",
			//   disabled: false,
			//   type: "text",
			//   required: true,
			//   regex: "[A-Za-z0-9 \\s]{0,}",
			// },
		],
		id: 'kitelementos'
	},
	title: 'Kit Elementos',
	selected: false
};

export const Fake = [
	{
		zone: 'zona 1',
		tables: [
			{ number: 1, shape: 'redonda', size: 'chica', col: 1, row: 3, busy: true, group: [1, 2] },
			{ number: 2, shape: 'cuadrada', size: 'chica', col: 1, row: 4, busy: true, group: [1, 2] },
			{ number: 3, shape: 'cuadrada', size: 'chica', col: 1, row: 6, busy: false, group: [] }
		]
	},
	{
		zone: 'zona 2',
		tables: [{ number: 1, shape: 'redonda', size: 'chica', col: 1, row: 3, busy: true, group: [] }]
	}
];

export const fakeDataTwo = [
	{
		name: 'zona1',
		label: 'zona1',
		collection: 'zona1',
		fields: [
			{
				name: 'zona1',
				tables: [
					{ number: 1, shape: 'redonda', size: 'chica', col: 1, row: 3, busy: true, group: [1, 2] },
					{ number: 2, shape: 'cuadrada', size: 'chica', col: 1, row: 4, busy: true, group: [1, 2] },
					{ number: 3, shape: 'cuadrada', size: 'chica', col: 1, row: 6, busy: false, group: [] }
				]
			}
		]
	},
	{
		name: 'zona2',
		label: 'zona2',
		collection: 'zona2',
		fields: [
			{
				name: 'zona2',
				tables: [{ number: 1, shape: 'redonda', size: 'chica', col: 1, row: 3, busy: true, group: [] }]
			}
		]
	}
];
