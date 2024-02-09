/**
 * Copyright (C) 2024 Justin Randall, Smart Interactive Transformations Inc.
 *
 * This file is part of sitinc/dialogflowcx-tagexpress
 *
 * sitinc/dialogflowcx-tagexpress is free software: you can redistribute it
 * and/or modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * sitinc/dialogflowcx-tagexpress is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
 * Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * sitinc/dialogflowcx-tagexpress. If not, see
 * <https://www.gnu.org/licenses/>.
 */
import { Request, Response } from 'express';

/**
 * Webhook Request Router based on tags.
 * 
 * @author Justin Randall
 * @version 0.0.1
 */
export class WebhookContext {
    public transId: string;
    public req: Request;
    public res: Response;
    public params: any = {};

    /**
     * Construct a new instance.
     * @param transId The transaction ID.
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     */
    constructor(transId: string, req: Request, res: Response) {
        this.transId = transId;
        this.req = req;
        this.res = res;
    }
}
