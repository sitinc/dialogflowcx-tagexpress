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

import { TagRouter } from "./tagRouter";
import { WebhookContext } from "./webhookContext";

/**
 * Webhook Request Router based on tags.
 * 
 * @author Justin Randall
 * @version 0.0.1
 */
export class WebhookRouter {
    private _tagRouters: Map<string,TagRouter>;

    /**
     * Construct a new instance.
     */
    constructor() {
        this._tagRouters = new Map();
    }

    /**
     * Gets the tagRouters.
     *
     * @return The tagRouters.
     */
    get tagRouters() {
        return this._tagRouters;
    }

    /**
     * Sets the tagRouters.
     *
     * @param value The value.
     */
    set tagRouters(value: Map<string,TagRouter>) {
        this._tagRouters = value;
    }

    /**
     * Register a tag router.
     * @param tagName   The tag name.
     * @param router    The tag router.
     */
    use (tagName: string, router: TagRouter): void {
        if (this._tagRouters.has(tagName)) {
            throw new Error(`tag router ${tagName} already registered`);
        }
        this._tagRouters.set(tagName, router);
    }

    /**
     * Register a tag router.
     * @param webhookRouter The webhook router.
     */
    useRouter (webhookRouter: WebhookRouter): void {
        const merged = new Map([...webhookRouter.tagRouters, ...this.tagRouters]);
        this.tagRouters = merged;
    }

    /**
     * Handle a webhook tag.
     * @param tagName   The tag name.
     * @param context   The webhook context.
     */
    async handle (tagName: string, context: WebhookContext) {
        if (!this._tagRouters.has(tagName)) {
            console.warn(`tag router ${tagName} not found`);
            return context;
        }

        const tagRouter = this._tagRouters.get(tagName);
        if (tagRouter == undefined) {
            return context;
        }
        
        const updatedContext = await tagRouter.handle(context);
        return updatedContext;
    }
}
