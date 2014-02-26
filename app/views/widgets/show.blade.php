<?php
    use Widget as W;

    $widgetSettings = $widget->widget_settings;

    if($widgetSettings[W::SETTINGS_FILTERS])
    {
        $filters = SearchFilter::whereIn('filter_key', $widgetSettings[W::SETTINGS_FILTERS])->get();
    }
    else
    {
        $filters = array();
    }

?>

<h2>{{ $widget->name }}

    <a class="btn btn-default" href="{{ $widget->link('edit') }}">Edit</a>
</h2>

<fieldset>
    <legend>Details</legend>

    <dl class="dl-horizontal">

        <dt>Widget Key</dt>
        <dd>{{ $widget->widget_key }}</dd>


        @if(count($filters))
            <dt>Filters</dt>
            @foreach($filters as $f)
                <dd><a href="{{ $f->link() }}">{{ $f->name }}</a></dd>
            @endforeach
        @endif

        <dt>Show Facets / Filtering</dt>
        <dd>{{ $widgetSettings[W::SETTINGS_SHOW_FACETS] ? 'True' : 'False' }}</dd>

        <dt>Show Resource Modal</dt>
        <dd>{{ $widgetSettings[W::SETTINGS_SHOW_RESOURCE_MODAL] ? 'True' : 'False' }}</dd>

        <dt>Enable Flagging</dt>
        <dd>{{ $widgetSettings[W::SETTINGS_ENABLE_FLAGGING] ? 'True' : 'False' }}</dd>

    </dl>
</fieldset>


<fieldset>
    <legend>Embed</legend>

    <pre>&lt;!-- Include script in html -->
&lt;script type="text/javascript" src="{{ URL::to('/embed/widget/'.$widget->api_user->api_key.'/embed.js') }}" />&lt;/script>

&lt;!-- Add div tag where you would like search widget rendered/injected -->
&lt;div class="lr-search-widget" data-widget-key="{{ $widget->widget_key }}">&lt;/div></pre>
</fieldset>

<fieldset>
    <legend>Demo</legend>

    <div class="lr-search-widget" data-widget-key="{{ $widget->widget_key }}"></div>

    <script>
        head.js('/embed/widget/{{ Auth::user()->api_key }}/embed.js');
    </script>
</fieldset>


