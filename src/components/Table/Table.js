import { isEmpty } from 'lodash';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

export function Table({ columns, className, ...restProps }) {
    if (!Array.isArray(columns) && isEmpty(columns)) return null;

    return (
        <div className={`overflow-x-auto w-full ${className || ''}`}>
            <table className="border-collapse border-none min-w-0 w-full">
                <thead>
                    <TableHeader columns={columns} />
                </thead>

                <tbody>
                    <TableRow columns={columns} {...restProps} />
                </tbody>
            </table>
        </div>
    );
}
