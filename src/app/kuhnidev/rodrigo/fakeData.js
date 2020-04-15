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
