import { PostgrestError, RealtimeChannel } from "@supabase/supabase-js";
import { SupabaseHandler } from "./base";
// import { ChatRoomModel, MessageModel, UserModel } from "../../models";

export class TableAPIHandler extends SupabaseHandler {
    private range: number;
    private table: string;
    private channels: RealtimeChannel | null;
    constructor(table: string, range: number = 100) {
        super();
        this.range = range;
        this.table = table;
        this.channels = null;
    }

    async getAll(): Promise<any[] | null> {
        let query = this.getClient().from(this.table).select("*");
        // if (scope !== "/") query = query.eq("scope", scope);

        let { data: bookings, error } = await query;
        if (error) return null;
        console.log(error, bookings);
        return bookings!;
    }

    async getSomeColumns(columns: string): Promise<any[] | PostgrestError> {
        // "some_column,other_column"
        let { data: bookings, error } = await this.getClient().from(this.table).select(columns).range(0, this.range);
        console.log(error, bookings);
        if (error) return error;
        console.log(error, bookings);
        return bookings!;
    }

    // async insertRows(bookings: MessageModel[] | ChatRoomModel[]): Promise<any[] | null> {
    //     const { data, error } = await this.getClient().from(this.table).insert(bookings).select();
    //     if (error) return null;
    //     console.log(error, data);
    //     return data!;
    // }

    async upsertRows(columns: Object): Promise<any[] | PostgrestError> {
        const { data, error } = await this.getClient()
            .from(this.table)
            .upsert({ ...columns })
            .select();
        console.log(data, error);
        if (error) return error;
        return data!;
    }

    async getForCondition(column: string, value: string): Promise<any[] | null> {
        let { data: payload, error } = await this.getClient().from(this.table).select("*").eq(column, value);
        if (error) return null;
        return payload!;
    }

    async filterRow(): Promise<any[] | PostgrestError> {
        let { data: bookings, error } = await this.getClient()
            .from(this.table)
            .select("*")

            // Filters
            .eq("column", "Equal to")
            .gt("column", "Greater than")
            .lt("column", "Less than")
            .gte("column", "Greater than or equal to")
            .lte("column", "Less than or equal to")
            .like("column", "%CaseSensitive%")
            .ilike("column", "%CaseInsensitive%")
            .is("column", null)
            .in("column", ["Array", "Values"])
            .neq("column", "Not equal to")

            // Arrays
            .contains("array_column", ["array", "contains"])
            .containedBy("array_column", ["contained", "by"]);
        console.log(bookings, error);
        if (error) return error;
        return bookings!;
    }

    async updateRow(column: string, value: any, update: Object): Promise<any[] | null> {
        const { data, error } = await this.getClient()
            .from(this.table)
            .update({ ...update })
            .eq(column, value)
            .select();
        this.channels = this.channels;
        if (error) return null;
        return data!;
    }

    async deleteRow(column: string, value: any): Promise<PostgrestError | null> {
        const { error } = await this.getClient().from(this.table).delete().eq(column, value);
        console.log(error);
        return error;
    }

    async unSubscribe(): Promise<void> {
        if (this.channels) this.channels.unsubscribe();
        return;
    }

    // async subAllToEvents(setNewMessage: React.Dispatch<any>): Promise<void> {
    //     const channels = this.getClient()
    //         .channel("custom-all-channel")
    //         .on("postgres_changes", { event: "*", schema: "public", table: this.table }, (payload) => {
    //             setNewMessage(payload);
    //         })
    //         .subscribe();
    //     this.channels = channels;
    //     return;
    // }

    // async subToInserts(setNewMessage: React.Dispatch<any>): Promise<void> {
    //     const channels = this.getClient()
    //         .channel("custom-insert-channel")
    //         .on("postgres_changes", { event: "INSERT", schema: "public", table: this.table }, (payload) => {
    //             setNewMessage(payload);
    //         })
    //         .subscribe();
    //     this.channels = channels;
    //     return;
    // }

    // async subToUpdates(setNewMessage: React.Dispatch<any>): Promise<void> {
    //     const channels = this.getClient()
    //         .channel("custom-update-channel")
    //         .on("postgres_changes", { event: "UPDATE", schema: "public", table: this.table }, (payload) => {
    //             setNewMessage(payload);
    //         })
    //         .subscribe();
    //     this.channels = channels;
    //     return;
    // }

    // async subToDeletes(setNewMessage: React.Dispatch<any>): Promise<void> {
    //     const channels = this.getClient()
    //         .channel("custom-delete-channel")
    //         .on("postgres_changes", { event: "DELETE", schema: "public", table: this.table }, (payload) => {
    //             setNewMessage(payload);
    //         })
    //         .subscribe();
    //     this.channels = channels;
    //     return;
    // }

    // async subToRow(column: string, value: any, setNewMessage: React.Dispatch<any>): Promise<void> {
    //     const channels = this.getClient()
    //         .channel("custom-filter-channel")
    //         .on(
    //             "postgres_changes",
    //             { event: "*", schema: "public", table: this.table, filter: `${column}=eq.${value}` },
    //             (payload) => {
    //                 setNewMessage(payload);
    //             }
    //         )
    //         .subscribe();
    //     this.channels = channels;
    //     return;
    // }
}
