import styles from "./styles.module.css";
import { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";

export default function Form({ type }) {
    switch (type) {
        case "agendamento":
            return <Agendamento />;
        default:
            return <ErrorPage />;
    }
}

//#region Agendamento
function Agendamento() {
    const [ajuda, setAjuda] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        situacao: "",
        descricao: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/agendamentos", {
            onSuccess: () => setAjuda(true),
        });
    }

    if (ajuda) {
        return (
            <div className={styles.Container}>
                <div className={styles.content}>
                    <h1>Agendamento de visita</h1>
                    <div className={styles.line} />
                    <p>
                        Agende uma visita do assistente social à sua residência
                        para solicitar um benefício
                    </p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.Container}>
            <div className={styles.content}>
                <h1>Agendamento de visita</h1>
                <div className={styles.line} />
                <input
                    name="situacao"
                    value={data.situacao}
                    onChange={(e) => setData("situacao", e.target.value)}
                    placeholder="Situação"
                />
                {errors.situacao && <div>{errors.situacao}</div>}
                <input
                    name="descricao"
                    value={data.descricao}
                    onChange={(e) => setData("descricao", e.target.value)}
                    placeholder="Descrição | Endereço"
                />
                {errors.descricao && <div>{errors.descricao}</div>}
                <button type="submit" disabled={processing}>
                    {processing ? "Enviando..." : "Fazer Agendamento"}
                </button>
            </div>
            <h2 onClick={() => setAjuda(true)}>Precisa de ajuda?</h2>
        </form>
    );
}
//#endregion

//#region Error
import { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia-react";

function ErrorPage() {
    const [count, setCount] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    Inertia.visit("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.Container}>
            <div className={styles.content}>
                <h1>Error 404</h1>
                <div className={styles.line} />
                <h4>
                    Redirecionando para tela inicial em {count} segundos
                </h4>
            </div>
        </div>
    );
}
//#endregion
